"use client";

import {
   Card,
   CardContent,
   CardHeader
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";

interface CardWrapperProps {
   children: React.ReactNode;
};

export const CardWrapper = ({
   children,
}: CardWrapperProps) => {
   return (
      <Card className="w-[400px] shadow-md">
         <CardHeader>
            <Header />
         </CardHeader>
         <CardContent>
            {children}
         </CardContent>
      </Card>
   );
};