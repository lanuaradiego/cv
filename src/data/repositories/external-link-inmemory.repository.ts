import ExternalLink from "../../domain/models/external-link.model";
import ExternalLinkRepository from "../../domain/repositories/external-link.repository";

export default class ExternalLinkInMemoryRepository implements ExternalLinkRepository {
    getExternalLinks(): Promise<ExternalLink[]> {
        return Promise.resolve([
            new ExternalLink(
                "Google Play (My Apps)",
                "https://bit.ly/40lQ5bY",
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAD1BMVEUAAADxTS5Hhe4yqVD6vgATRDuUAAAAAXRSTlMAQObYZgAAAIxJREFUKM99kMENwzAIRam6QJCygPECkcgAObD/TDXgGkOlcvtPDwwG+K33VTJzJsyF9EpIAe+gF0Ku8AYKGcCbrgCu3E8AU0SeBVS5ZRKaimgtQCa44qCLfBUHrQI8c0tDzEMRTVnPDkGVWEwznrG6CXjEcZYxzm8pwxS2L2w5A+0DtWqGV8mDHPCvPu0tKfu8tQf4AAAAAElFTkSuQmCC"
            ),
            new ExternalLink(
                "LinkedIn (My CV and courses)",
                "https://bit.ly/46Tteaf",
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAgMAAADXB5lNAAAACVBMVEUAAAAAd7b6/vx270BbAAAAAXRSTlMAQObYZgAAAKNJREFUOMvl0zEOwjAMBdAwcIRyHo7QgR+puUFzHzOwZ4hPSVxK67hRO1RM/MXSk21liJ2z6VByt6DpRhP0Fub0y8icR+l4sZYJyIDfwDNZyEdA2SuQd+R1bwvGiNGncyBlF65Swi6ExC0YwJwqCMy87gCGWIAUSIPM1JAFLh+ICziU/WBuAmvIskZDgq+BtoADwN9CfQ2/gc4c4fc/wJzvmbwBA/lQ9KmeEKMAAAAASUVORK5CYII="
            ),
            new ExternalLink(
                "Credly (My badges)",
                "https://bit.ly/49nXziA",
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAACcUlEQVQoz22TSWtUQRRGTw3vmXRUOpOJiUNwFiIiTgtRECWKqBuFKPkBgYju3IiuBN2IC4eF/gdBMSHqSnHCaAsaVMQJJzLbnZCYfq/qVbnISycBP6hFXe5Xt+6pW+LUw4fre3M9l/p//WixUaRdYrDGYowhimOKJsYYi/eeVAboBk7r3lzPhdyL5wf+TozzXwkB3uMBKQRAABwCirLv5/d9fyfGEUKUlgeUlGQr5hNqTbZiPstqa+ccCezXJiqWz44651jV0Mjpo61sWb2G74MDCCEYGi3Qcf0Kzrnp1DLpk6Rk9N5Tm81yteMk29au49bTxyzIZDiwdTvPP7zHWDunI53MCjjvadu9h9UNjbRePE/P+3dMxsdprKrhwetXiKmeS5LWmlLVbEUFR3bs4n7uFa8/f0KHISvrG3j56SP9+fw0MACUUujYWBAC7xwN1TU01dVxs7uTxDmUlNy810VsDDZJUFKWzEEYoCNjEIADFpZn0EoxUMinryR4+/ULCMGy2kUMj40Smamb6kAj43QDUIxjjE1QUs1ABJqXN3G1/QSLK6tw3oMHoTUySWlLIejP/2GkUGBn8waklJjEUl9ZxdljbfwcGOD3yHDat8cqhZ4ZJMHQ2Ci3nz2h/eBh5gUBfSMjtGzaTHFykst3bhFZW4IWSTljniZ+414XleUZ9m7chE0SHvW+4Vr3Xb4NDc6hnQiJCA62TACZ2QeUBSH12Uqcd/QV8sSzKqZJuKVLRjXQBRxN5xUhBEVr+DbUPwVGCGRqKClT7n1NdacGzgAS2J/+GKQQ6HAeYRiiwgCnNZGSxELhlTK+uqrLrVpx7h/Q4Q12/jWyGQAAAABJRU5ErkJggg=="
            ),
        ]);
    }
}