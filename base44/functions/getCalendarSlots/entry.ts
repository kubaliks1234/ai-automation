import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const { accessToken } = await base44.asServiceRole.connectors.getConnection("googlecalendar");

        // Get free/busy for the next 14 days
        const now = new Date();
        const end = new Date();
        end.setDate(end.getDate() + 14);

        const freeBusyRes = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                timeMin: now.toISOString(),
                timeMax: end.toISOString(),
                items: [{ id: 'primary' }],
            }),
        });

        const freeBusy = await freeBusyRes.json();
        const busySlots = freeBusy.calendars?.primary?.busy || [];

        // Generate available slots: Mon-Fri, 9:00-17:00 CET (UTC+1), 30-min slots
        const availableSlots = [];
        const cursor = new Date(now);
        cursor.setMinutes(0, 0, 0);
        cursor.setHours(cursor.getHours() + 1); // start from next hour

        while (cursor < end && availableSlots.length < 20) {
            const dayOfWeek = cursor.getDay();
            const hour = cursor.getUTCHours(); // CET = UTC+1, so 9:00 CET = 8:00 UTC

            // Mon-Fri (1-5), 8:00-16:00 UTC = 9:00-17:00 CET
            if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 8 && hour < 17) {
                const slotStart = new Date(cursor);
                const slotEnd = new Date(cursor);
                slotEnd.setMinutes(slotEnd.getMinutes() + 30);

                // Check if slot overlaps with busy time
                const isBusy = busySlots.some(busy => {
                    const busyStart = new Date(busy.start);
                    const busyEnd = new Date(busy.end);
                    return slotStart < busyEnd && slotEnd > busyStart;
                });

                if (!isBusy && slotStart > new Date()) {
                    availableSlots.push({
                        start: slotStart.toISOString(),
                        end: slotEnd.toISOString(),
                    });
                }
            }

            cursor.setMinutes(cursor.getMinutes() + 30);
        }

        return Response.json({ slots: availableSlots });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});