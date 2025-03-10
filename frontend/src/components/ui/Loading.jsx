const Loading = ({ size = 'default' }) => {
  const sizes = {
    small: 'h-4 w-4',
    default: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizes[size]} animate-spin rounded-full border-2 border-gray-300 border-t-primary`} />
    </div>
  );
};

export default Loading; 