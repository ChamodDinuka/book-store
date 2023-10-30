export interface ButtonProps {
    label: string;
    callBackFunction:()=> void;
}

export interface CardProps {
    title: string;
    subtitle: string;
    isbn13: string;
    price: string;
    image: string;
    authors?:string;
    year?:string;
    desc?:string;
    count?:number;
    firstCallBackFunction:()=> void;
    secondCallBackFunction:()=> void;
    counterCallBackFunction:(count:number,isbn13:string)=> void;
}
