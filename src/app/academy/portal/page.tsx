import React from 'react';
import AcademyPortal from '../../../components/AcademyPortal';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function AcademyPortalPage() {
  return (
    <ProtectedRoute>
      <div className="bg-[#050505] min-h-screen pt-24 pb-16">
      <AcademyPortal />
      </div>
    </ProtectedRoute>
  );
}
