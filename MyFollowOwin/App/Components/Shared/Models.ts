export enum OwnerRequestStates { Pending=0, Approved=1, Rejected=2}
export enum Platform { Mobile, Web, IOT }
export enum Media { Pictures, videos, GIF }

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
class Address {
    public Street1: string;
    public Street2: string;
    public City: string;
    public State: string;
    public Country: string;
    public Pin: number;
    public ContactNo: number;
}

export class UserModel {
    public Id: string;
    public Name: string;
    public Address: Address;
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
    public ProductMedia: Media;
    public ImagePath: string;
    public VideoUrl: string;
    public Gifpath: string;
    public Dates: CommonProperty;
}

export class Followers {
    public ProductId: number;
    public UserId: string;
    public StatusBit: boolean;
}
