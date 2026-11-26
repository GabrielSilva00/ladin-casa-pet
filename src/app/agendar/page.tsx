"use client";

import { useBooking } from "@/components/booking/BookingContext";
import { StepPet } from "@/components/booking/StepPet";
import { StepService } from "@/components/booking/StepService";
import { StepSchedule } from "@/components/booking/StepSchedule";
import { StepTutor } from "@/components/booking/StepTutor";
import { StepReview } from "@/components/booking/StepReview";

export default function AgendarPage() {
  const { state } = useBooking();
  switch (state.current) {
    case "pet": return <StepPet />;
    case "service": return <StepService />;
    case "schedule": return <StepSchedule />;
    case "tutor": return <StepTutor />;
    case "review": return <StepReview />;
  }
}
