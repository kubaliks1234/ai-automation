import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function MobileCTABar() {
  return (
    <motion.div
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="fixed bottom-0 inset-x-0 z-40 sm:hidden"
    >
      <div className="bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-gray-800 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Link to="/anfragen-check">
          <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-xl py-3 text-base font-medium group">
            Kostenloser Anfragen-Check
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}