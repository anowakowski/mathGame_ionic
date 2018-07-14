import { MathResultBase } from "./mathResult-Base";
import { MathResultConfigurationModel } from "../../../models/mathResultProcessing/mathResultConfiguration-model";
import { MathResultModel } from "../../../models/mathResultProcessing/mathResult-model";

export class AnswerValueRule implements MathResultBase {
    runMathResult(configuration:MathResultConfigurationModel): MathResultModel[]{
        throw new Error("Method not implemented.");
    }
}
