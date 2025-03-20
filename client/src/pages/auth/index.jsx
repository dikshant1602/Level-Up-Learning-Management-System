import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"; // ✅ Added Tabs
import { GraduationCap } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("signin");

  function handleTabChange(value) {
    setActiveTab(value);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link to="/" className="flex items-center justify-center">
          <GraduationCap className="h-8 w-8 mr-4" />
          <span className="font-extrabold text-xl">LEVEL UP</span>
        </Link>
      </header>

      {/* Authentication Tabs */}
      <div className="flex items-center justify-center flex-grow bg-gray-100"> {/* ✅ Fixed bg */}
        <Tabs
          value={activeTab}
          defaultValue="signin"
          onValueChange={handleTabChange}
          className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        >
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-2 border-b">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <TabsContent value="signin">
            <p className="text-center text-gray-700">Sign In Form Here</p>
          </TabsContent>
          <TabsContent value="signup">
            <p className="text-center text-gray-700">Sign Up Form Here</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPage;
