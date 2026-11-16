import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useState } from "react";
import { Choice, ChoiceGroup, Segmented } from "@/components/ship/ui";

function Selections() {
  const [care, setCare] = useState("doctor");
  const [term, setTerm] = useState<"quarter" | "semester">("quarter");
  return <>
    <ChoiceGroup label="Type of care" value={care} onChange={setCare}>
      <Choice value="doctor">Doctor’s visit</Choice><Choice value="mental">Mental health</Choice>
    </ChoiceGroup>
    <Segmented label="Term system" value={term} onChange={setTerm} options={[{ value: "quarter", label: "Quarter" }, { value: "semester", label: "Semester" }]} />
  </>;
}

describe("Accessible selection controls", () => {
  it("updates care and term selection through their radio controls", () => {
    render(<Selections />);
    fireEvent.click(screen.getByRole("radio", { name: "Mental health" }));
    expect(screen.getByRole("radio", { name: "Mental health" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Doctor’s visit" })).not.toBeChecked();
    fireEvent.click(screen.getByRole("radio", { name: "Semester" }));
    expect(screen.getByRole("radio", { name: "Semester" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Quarter" })).not.toBeChecked();
  });
});