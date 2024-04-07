import snpm from "@/snpm";

export default class Command {
    public static execute() {
        console.log(snpm.version);
    }
}
