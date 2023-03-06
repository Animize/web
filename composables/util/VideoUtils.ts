import {integer} from "vscode-languageserver-types";
import dayjs from "dayjs";

export const convertSecondToVideoDurationFormat = (second: integer): string => {


    return dayjs()
        .hour(0)
        .minute(0)
        .second(second).format("HH:mm:ss")
}