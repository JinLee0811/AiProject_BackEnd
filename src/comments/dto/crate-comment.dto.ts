export class CreateCommentDto {
  content: string;
  parent_comment_id?: number | null;
}
