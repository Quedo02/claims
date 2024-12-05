export interface claim {
    ID: number;
    Affected: string;
    Topic: string;
    Points: number;
    Description: string;
    Date: string;
    Week: number;
    Ticket: string;
    Status: number;
}
export interface ClaimForm {
    id_topic: string;
    affected: string;
    rel_ticket: string;
    date: string;
    time: string;
    description: string;
    internal: boolean;
    whosent: string;
  }

export interface comment{
    id_comments:number;
    affected_comment: string;
    manager_comment: string;    
}

export interface topic{
    id_topic:number;
    topic: string;
    points: number;
}

export interface tracing{
    it_tracing: number;
    id_claim: number;
    id_comment: number;
    tracing: string;
    result: string;
    points: number;
    status: number;
}

export interface member{
    emp_name:string;
}

export interface tracingclaim{
    id_comments: number;
    affected_comment: string;
    manager_comment: string;
    id_tracing: number;
    id_claim: number;
    id_comment: number;
    tracing: string;
    result: string;
    points: number;
    status: 1;
}
