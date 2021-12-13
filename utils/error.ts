
abstract class CustomError extends Error{
    httpStatusCode:string = "";
}

export  class ValidationError extends CustomError{

    constructor(message:string){
        super(message);
        this.name = "NOT_VALID";
        this.httpStatusCode = "400";
    }
}

export  class AuthenticationError extends CustomError{

    constructor(message:string){
        super(message);
        this.name = "NOT_VALID";
        this.httpStatusCode = "401";
    }
}


export  class NotFoundError extends CustomError{

    constructor(message:string){
        super(message);
        this.name = "NOT_FOUND";
        this.httpStatusCode = "404";
    }
}

export  class AccessDenied extends CustomError{

    constructor(message:string){
        super(message);
        this.name = "NOT_ALLOWED";
        this.httpStatusCode = "403";
    }
}

export  class ExistError extends CustomError{

    constructor(message:string){
        super(message);
        this.name = "ENTRY_ALREADY_EXIST";
        this.httpStatusCode = "409";
    }
}

export  class ErrorMessage extends CustomError{

    constructor(message:string){
        super(message);
        this.name = "INTERNAL_SERVER_ERROR";
        this.httpStatusCode = "500";
    }
}
  
    
   
