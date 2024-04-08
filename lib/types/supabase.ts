export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          password: string;
          role: "buyer" | "supplier";
        };
        Insert: {
          id?: string;
          email: string;
          password: string;
          role: "buyer" | "supplier";
        };
        Update: {
          id?: string;
          email?: string;
          password?: string;
          role?: "buyer" | "supplier";
        };
        Relationships: [
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      productRequests: {
        Row: {
          id: string;
          userId: string;
          category: string;
          description: string;
          quantity: number;
          deliveryTimeframe: string; // Date string
          images: Json; // Array of image URLs
          certifications: Json; // Array of certifications
          budgetRange: Json; // Object with min and max values
        };
        Insert: {
          id?: string;
          userId: string;
          category: string;
          description: string;
          quantity: number;
          deliveryTimeframe: string;
          images?: Json;
          certifications?: Json;
          budgetRange?: Json;
        };
        Update: {
          id?: string;
          userId?: string;
          category?: string;
          description?: string;
          quantity?: number;
          deliveryTimeframe?: string;
          images?: Json;
          certifications?: Json;
          budgetRange?: Json;
        };
        Relationships: [
          {
            foreignKeyName: "productRequests_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      supplierResponses: {
        Row: {
          id: string;
          requestId: string;
          supplierId: string;
          responseSummary: string;
          proposal: string;
        };
        Insert: {
          id?: string;
          requestId: string;
          supplierId: string;
          responseSummary: string;
          proposal: string;
        };
        Update: {
          id?: string;
          requestId?: string;
          supplierId?: string;
          responseSummary?: string;
          proposal?: string;
        };
        Relationships: [
          {
            foreignKeyName: "supplierResponses_requestId_fkey";
            columns: ["requestId"];
            isOneToOne: false;
            referencedRelation: "productRequests";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "supplierResponses_supplierId_fkey";
            columns: ["supplierId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      messages: {
        Row: {
          id: string;
          senderId: string;
          receiverId: string;
          messageContent: string;
          attachment: string;
        };
        Insert: {
          id?: string;
          senderId: string;
          receiverId: string;
          messageContent: string;
          attachment: string;
        };
        Update: {
          id?: string;
          senderId?: string;
          receiverId?: string;
          messageContent?: string;
          attachment?: string;
        };
        Relationships: [
          {
            foreignKeyName: "messages_senderId_fkey";
            columns: ["senderId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "messages_receiverId_fkey";
            columns: ["receiverId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      buyerInbox: {
        Row: {
          // Structure for buyer inbox view
          supplierName: string;
          responseSummary: string;
          supplierProfile: string; // URL or ID for supplier profile
        };
      };
    };
    Functions: {
      matchingAlgorithm: {
        Parameters: {
          buyerRequest: Json;
          supplierProfiles: Json[];
        };
        Return: {
          supplierId: string;
          matchingScore: number;
        }[];
      };
    };
    Enums: {
        Role: {
            buyer: "buyer";
            supplier: "supplier";
        };
    };
    CompositeTypes: {
        BudgetRange: {
            min: number;
            max: number;
        };
    };
  };
}


