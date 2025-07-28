
import { supabase } from "@/integrations/supabase/client";
import { DiagnoseRequest } from "@/types";

export const diagnoseService = {
  // Create a new diagnose request
  async createRequest(request: Omit<DiagnoseRequest, 'id' | 'created_at' | 'updated_at' | 'status'>): Promise<DiagnoseRequest> {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('diagnose_requests')
      .insert([{
        ...request,
        user_id: user?.id || null,
        status: 'pending'
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating diagnose request:', error);
      throw error;
    }
    
    return data;
  },

  // Get all diagnose requests (for admin)
  async getAllRequests(): Promise<DiagnoseRequest[]> {
    const { data, error } = await supabase
      .from('diagnose_requests')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching diagnose requests:', error);
      throw error;
    }
    
    return data || [];
  },

  // Get user's diagnose requests
  async getUserRequests(): Promise<DiagnoseRequest[]> {
    const { data, error } = await supabase
      .from('diagnose_requests')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching user diagnose requests:', error);
      throw error;
    }
    
    return data || [];
  },

  // Update a diagnose request
  async updateRequest(id: string, updates: Partial<DiagnoseRequest>): Promise<DiagnoseRequest> {
    const { data, error } = await supabase
      .from('diagnose_requests')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating diagnose request:', error);
      throw error;
    }
    
    return data;
  }
};
