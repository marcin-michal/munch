// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {models} from '../models';

export function CreateRecord(arg1:models.RecordDTO):Promise<models.RecordDTO>;

export function DeleteDailyDiet(arg1:string):Promise<void>;

export function DeleteRecord(arg1:string):Promise<void>;

export function GetDailyDiet(arg1:string):Promise<models.DailyDietDTO>;

export function GetDailyNutritionalInfo(arg1:models.DailyDietDTO):Promise<models.NutritionalInfo>;

export function GetRecord(arg1:string):Promise<models.RecordDTO>;

export function UpdateRecord(arg1:models.RecordDTO):Promise<models.RecordDTO>;

export function UpsertDailyDiet(arg1:models.DailyDietDTO):Promise<models.DailyDietDTO>;
