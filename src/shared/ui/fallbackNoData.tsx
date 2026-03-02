import svg from "@/assets/images/genetic-data-svgrepo-com (1).svg";

interface EmptyStateProps {
  message?: string;
}

const EmptyState = ({ message = "No editor available" }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full border">
      <p className="text-sm text-gray-500 text-center">{message}</p>
      <img src={svg} alt="No editor available" className="w-32 opacity-70" />
    </div>
  );
};

export default EmptyState;
