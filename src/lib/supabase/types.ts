export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      agencies: {
        Row: {
          id: string
          name: string
          slug: string
          logo_url: string | null
          custom_domain: string | null
          plan: 'free' | 'growth' | 'agency'
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          logo_url?: string | null
          custom_domain?: string | null
          plan?: 'free' | 'growth' | 'agency'
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          logo_url?: string | null
          custom_domain?: string | null
          plan?: 'free' | 'growth' | 'agency'
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      agency_users: {
        Row: {
          id: string
          agency_id: string
          auth_user_id: string
          role: 'owner' | 'member'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          agency_id: string
          auth_user_id: string
          role?: 'owner' | 'member'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          agency_id?: string
          auth_user_id?: string
          role?: 'owner' | 'member'
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agency_users_agency_id_fkey"
            columns: ["agency_id"]
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          }
        ]
      }
      clients: {
        Row: {
          id: string
          agency_id: string
          name: string
          email: string
          brand_color: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          agency_id: string
          name: string
          email: string
          brand_color?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          agency_id?: string
          name?: string
          email?: string
          brand_color?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_agency_id_fkey"
            columns: ["agency_id"]
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          }
        ]
      }
      workspaces: {
        Row: {
          id: string
          agency_id: string
          client_id: string
          title: string
          status: 'draft' | 'sent' | 'approved' | 'changes_requested'
          due_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          agency_id: string
          client_id: string
          title: string
          status?: 'draft' | 'sent' | 'approved' | 'changes_requested'
          due_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          agency_id?: string
          client_id?: string
          title?: string
          status?: 'draft' | 'sent' | 'approved' | 'changes_requested'
          due_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspaces_agency_id_fkey"
            columns: ["agency_id"]
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspaces_client_id_fkey"
            columns: ["client_id"]
            referencedRelation: "clients"
            referencedColumns: ["id"]
          }
        ]
      }
      posts: {
        Row: {
          id: string
          workspace_id: string
          platform: 'instagram' | 'facebook' | 'linkedin' | 'tiktok' | 'x'
          caption: string | null
          media_url: string | null
          scheduled_date: string | null
          status: 'pending' | 'approved' | 'changes_requested'
          position: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          workspace_id: string
          platform: 'instagram' | 'facebook' | 'linkedin' | 'tiktok' | 'x'
          caption?: string | null
          media_url?: string | null
          scheduled_date?: string | null
          status?: 'pending' | 'approved' | 'changes_requested'
          position?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          workspace_id?: string
          platform?: 'instagram' | 'facebook' | 'linkedin' | 'tiktok' | 'x'
          caption?: string | null
          media_url?: string | null
          scheduled_date?: string | null
          status?: 'pending' | 'approved' | 'changes_requested'
          position?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_workspace_id_fkey"
            columns: ["workspace_id"]
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          }
        ]
      }
      approval_links: {
        Row: {
          id: string
          workspace_id: string
          token: string
          client_email: string
          expires_at: string | null
          last_viewed_at: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          workspace_id: string
          token: string
          client_email: string
          expires_at?: string | null
          last_viewed_at?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          workspace_id?: string
          token?: string
          client_email?: string
          expires_at?: string | null
          last_viewed_at?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "approval_links_workspace_id_fkey"
            columns: ["workspace_id"]
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          }
        ]
      }
      approval_actions: {
        Row: {
          id: string
          post_id: string
          approval_link_id: string
          action: 'approved' | 'changes_requested'
          client_name: string | null
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          approval_link_id: string
          action: 'approved' | 'changes_requested'
          client_name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          approval_link_id?: string
          action?: 'approved' | 'changes_requested'
          client_name?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "approval_actions_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "approval_actions_approval_link_id_fkey"
            columns: ["approval_link_id"]
            referencedRelation: "approval_links"
            referencedColumns: ["id"]
          }
        ]
      }
      comments: {
        Row: {
          id: string
          post_id: string
          approval_link_id: string | null
          body: string
          author_type: 'client' | 'agency'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          post_id: string
          approval_link_id?: string | null
          body: string
          author_type: 'client' | 'agency'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          approval_link_id?: string | null
          body?: string
          author_type?: 'client' | 'agency'
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_approval_link_id_fkey"
            columns: ["approval_link_id"]
            referencedRelation: "approval_links"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type TablesInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type TablesUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']

// Convenience row types
export type Agency = Tables<'agencies'>
export type AgencyUser = Tables<'agency_users'>
export type Client = Tables<'clients'>
export type Workspace = Tables<'workspaces'>
export type Post = Tables<'posts'>
export type ApprovalLink = Tables<'approval_links'>
export type ApprovalAction = Tables<'approval_actions'>
export type Comment = Tables<'comments'>
