import React from "react";
import { CareerType } from "../../../../../../model/career/Career";
import { Path } from "react-hook-form";
import { AppointmentType } from "../../../../../../model/career/Appointment";
import { CertificationType } from "../../../../../../model/career/Certification";
import { SourceType } from "../../../../../../model/common/Source";
import { Panel } from "./Panel/Panel";
import { Trigger } from "./Trigger/Trigger";

interface ReferencesToolProps {
  editMode: boolean;
  setEditMode: (arg: boolean) => void;
  openPanel: boolean;
  setOpenPanel: (arg: boolean) => void;
  currentName?:
    | Path<CareerType>
    | Path<AppointmentType>
    | Path<CertificationType>;
  setCurrentName: (
    arg: Path<CareerType> | Path<AppointmentType> | Path<CertificationType>,
  ) => void;
  lastSource?: SourceType;
  setLastSource: (arg: SourceType) => void;
}

export const ReferencesToolContext = React.createContext<ReferencesToolProps>({
  editMode: false,
  setEditMode: (arg: boolean) => {},
  openPanel: false,
  setOpenPanel: (arg: boolean) => {},
  setCurrentName: (
    arg: Path<CareerType> | Path<AppointmentType> | Path<CertificationType>,
  ) => {},
  setLastSource: (arg: SourceType) => {},
});

export const ReferencesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [editMode, setEditMode] = React.useState(false);
  const [openPanel, setOpenPanel] = React.useState(false);
  const [currentName, setCurrentName] = React.useState<
    Path<CareerType> | Path<AppointmentType> | Path<CertificationType>
  >();
  const [currentArrayId, setCurrentArrayId] = React.useState<number>();
  const [lastSource, setLastSource] = React.useState<SourceType>();

  return (
    <ReferencesToolContext.Provider
      value={{
        editMode,
        setEditMode,
        openPanel,
        setOpenPanel,
        currentName,
        setCurrentName,
        lastSource,
        setLastSource,
      }}
    >
      {children}
    </ReferencesToolContext.Provider>
  );
};

ReferencesProvider.Panel = Panel;
ReferencesProvider.Trigger = Trigger;
