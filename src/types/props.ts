export interface StaffServiceSelectorProps {
  date: Date;
  selectedCategoryId: string | null;
  selectedStaffId: string | null;
  selectedServiceId: string | null;
  onSelect: (
    categoryId: string | null,
    staffId: string | null,
    serviceId: string | null
  ) => void;
}

export interface ExtraServicesProps {
  date: Date;
  staffId: string;
  mainServiceId: string;
  onSelect: (services: string[]) => void;
}

export interface TimeSelectionProps {
  date: Date;
  staffId: string;
  serviceId: string;
  extraServices: string[];
  onSelect: (time: string) => void;
}

export interface ConfirmBookingProps {
  date: Date;
  time: string;
  staffId: string;
  serviceId: string;
  extraServices: string[];
  onConfirm: () => void;
}
