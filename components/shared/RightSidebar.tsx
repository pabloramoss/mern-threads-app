const RightSidebar: React.FC = () => {
  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-headin4-medium text-light-1">suggested community</h3>
      </div>{' '}
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-headin4-medium text-light-1">suggested users</h3>
      </div>
    </section>
  );
};

export default RightSidebar;
