// dto type for boolean
export type TDtoBoolean = boolean | null;

export enum EYesNo {
    yes = 'yes',
    no = 'no'
}

// yes-no dto helper
export const yesNoDtoHelper = (is: EYesNo | null | undefined): TDtoBoolean => {
    if (is === EYesNo.yes) { return true }
    if (is === EYesNo.no) { return false }
    return null;
}
