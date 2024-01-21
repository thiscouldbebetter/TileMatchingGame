"use strict";
class IdHelper {
    static IdNext() {
        IdHelper._idNext++;
        return IdHelper._idNext;
    }
}
IdHelper._idNext = 0;
