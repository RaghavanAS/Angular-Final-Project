/* Date Function which returns the Date and Timestamp */
export class CommonFunction {
    currentDate: Date;
    public getCurrentDate(): string {
        this.currentDate = new Date();
        const date = ('0' + this.currentDate.getDate()).slice(-2);
        const month = ('0' + (this.currentDate.getMonth() + 1)).slice(-2);
        const year = this.currentDate.getFullYear();
        const hours = this.currentDate.getHours();
        const minutes = this.currentDate.getMinutes();
        return `${year}-${month}-${date}-${hours}-${minutes}`;
    }
}
