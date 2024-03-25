export interface UserBotData {
  user_id: number;
  first_name: string;
  answer_count: string;
}
export interface UserKnowledgeData {
  kb: number;
  knowledge_base: string;
}
export interface KnowledgeData {
  kb: number;
  knowledge_base: string;
}
export interface TotalConvo {
  convo: number;
  number_ques_ans: number;
  number_ques_unans: number;
  last7days_convo: number;
  last7days_ans: number;
  last7days_unans: number;
}
export interface TotalUser {
  total_users: number;
  active_users: number;
  new_users_last_7_days: number;
  query_total_last_7_days: number;
}
export interface TotalKB{
  number_kb: number;
  new_kb: number;
  new_knowledge_base7: number;
  total_knowledge_7: number;
}