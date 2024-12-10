import React from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

interface Step {
  id: number;
  label: string;
  status: "finished" | "inProgress" | "waiting";
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
  direction?: "horizontal" | "vertical";
}

export default function ProgressSteps({
  steps,
  currentStep,
  direction = "horizontal",
}: ProgressStepsProps) {
  return (
    <div
      className={`flex ${
        direction === "vertical"
          ? "flex-col space-y-4"
          : "flex-row items-center space-x-8"
      }`}
    >
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          {/* Step Circle */}
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
              step.status === "finished"
                ? "border-blue-500 bg-blue-500 text-white"
                : step.status === "inProgress"
                ? "border-blue-500 bg-white text-blue-500"
                : "border-gray-500 bg-gray-800 text-gray-500"
            }`}
          >
            {step.status === "finished" ? (
              <CheckCircleIcon className="w-6 h-6" />
            ) : (
              <span>{step.id}</span>
            )}
          </div>

          {/* Label and Line */}
          {direction === "horizontal" && index < steps.length - 1 && (
            <div
              className={`h-1 w-36 ${
                step.status === "finished" || step.status === "inProgress"
                  ? "bg-blue-500"
                  : "bg-gray-500"
              }`}
            />
          )}

          {/* Label for vertical or horizontal */}
          {/* <div
            className={`mt-2 ${
              direction === "vertical" ? "ml-4" : "text-center"
            } text-sm ${
              step.status === "finished" || step.status === "inProgress"
                ? "text-white"
                : "text-gray-500"
            }`}
          >
            {step.label}
          </div> */}
        </div>
      ))}
    </div>
  );
}
