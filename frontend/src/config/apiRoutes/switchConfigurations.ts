export const API_SWITCHCONFIGURATIONS = {
  SWITCHSETTINGSLIST: () => `/SwitchConfigurations/SwitchSettingsList`,
  CHANGESWITCHSETTINGS: () => `/SwitchConfigurations/ChangeSwitchSettings`,
  EXPORTFILE: () => `/SwitchConfigurations/ExportList?options=`,
  BUILD:()=>`/SwitchConfigurations/Build`,
  SAVE:()=>`/SwitchConfigurations/Save`,
  PREPARE:(token:string)=>`/SwitchConfigurations/Prepare?token=${token}`,
  DELETE:()=>`/SwitchConfigurations/Delete`
};
