import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import PreviousInterview from "./_components/PreviousInterview";

const Dashboard = () => {
  return (
    <div className="p-10 mt-2">
      <h1 className="font-bold text-5xl text-center">Dashboard</h1>
      <h1 className="text-gray-700 text-center mt-2">
        Create and start your preparation with AI Interview
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>
      <PreviousInterview />
    </div>
  );
};

export default Dashboard;
