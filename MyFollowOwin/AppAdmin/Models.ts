export enum OwnerRequestStates { Pending=0, Approved=1, Rejected=2}

export class OwnerModel {
    public Id: number;
    public CompanyName: string;
    public Description: string;
    public FoundedYear: number;
    public WebsiteUrl: string;
    public OwnerStates: OwnerRequestStates = OwnerRequestStates.Pending;
}