export enum OwnerRequestStates { Pending=0, Approved=1, Rejected=2}
export enum Platform { Mobile, Web, IOT }
export enum Media { Pictures, Videos, Audio }

export class OwnerModel {
    public Id: number;
    public CompanyName: string;
    public Description: string;
    public FoundedYear: number;
    public WebsiteUrl: string;
    public OwnerStates: OwnerRequestStates = OwnerRequestStates.Pending;
    public user: UserModel;
}

export class CommonProperty {
    public CreateDate: Date;
    public ModifiedDate: Date; 
}

export class UserModel {
    public Id: string;
    public Name: string;  
    public Email: string;
}

export class ProductModel {
    public Id: number;
    public Name: string;
    public Description: string;
    public HomepageUrl: string;
    public PlayStoreUrl: string;
    public AppStoreUrl: string;   
    public ProductPlatform: Platform;
    public Dates: CommonProperty;      
}

export class ProductUpdate {
    public UpdateId: number;
    public ProductId: number;
    public Title: string;
    public Details: string;     
    public Dates: CommonProperty;    
}

export class Followers {
    public ProductId: number;
    public UserId: string;  
}

export class AddMedia {
    public ProductMedia: Media;
    public Path: string;
    public UpdateId: number;
}
