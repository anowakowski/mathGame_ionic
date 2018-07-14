import { MathResultModel } from "../../../models/mathResultProcessing/mathResult-model";
import { MathResultConfigurationModel } from "../../../models/mathResultProcessing/mathResultConfiguration-model";

export abstract class MathResultBase {
    runMathResult(configuration:MathResultConfigurationModel): MathResultModel[]{
        throw new Error("Method not implemented.");
    }
}

