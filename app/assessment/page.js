import dynamic from "next/dynamic";

const AssessmentClient = dynamic(() => import("@/components/assessment/assessment-client"), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading Portal...</div>,
});

export default function AssessmentPage() {
  return <AssessmentClient />;
}
