import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const { start, end, guestEmail, guestName } = await req.json();

        if (!start || !end || !guestEmail) {
            return Response.json({ error: 'Fehlende Pflichtfelder' }, { status: 400 });
        }

        const { accessToken } = await base44.asServiceRole.connectors.getConnection("googlecalendar");

        const event = {
            summary: `Kostenlose KI-Analyse – ${guestName || guestEmail}`,
            description: `Kostenlose KI-Analyse mit ${guestName || guestEmail}.\n\nDer Interessent hat den Guide "10 AI Automationen für Unternehmen" heruntergeladen.`,
            start: { dateTime: start, timeZone: 'Europe/Berlin' },
            end: { dateTime: end, timeZone: 'Europe/Berlin' },
            attendees: [{ email: guestEmail, displayName: guestName || guestEmail }],
            conferenceData: {
                createRequest: {
                    requestId: `ki-analyse-${Date.now()}`,
                    conferenceSolutionKey: { type: 'hangoutsMeet' }
                }
            },
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 1440 },
                    { method: 'popup', minutes: 30 }
                ]
            }
        };

        const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });

        if (!res.ok) {
            const err = await res.text();
            return Response.json({ error: err }, { status: 500 });
        }

        const createdEvent = await res.json();
        return Response.json({ success: true, eventId: createdEvent.id, meetLink: createdEvent.hangoutLink });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});