
import { APIResponse } from "../../../shared/infra/services/APIResponse";
import { BaseAPI } from "../../../shared/infra/services/BaseAPI";
import { IAuthService } from "../../users/services/authService";
import { Comment } from "../models/Comment";
import { Result } from "../../../shared/core/Result";
import { right, left } from "../../../shared/core/Either";
import { CommentDTO } from "../dtos/commentDTO";
import { CommentUtil } from "../../../shared/utils/CommentUtil";

export interface ICommentService {
  createReplyToPost (text: string, slug: string): Promise<APIResponse<void>>;
  createReplyToComment (text: string, parentCommentId: string): Promise<APIResponse<void>>;
  getCommentsBySlug (slug: string, offset?: number): Promise<APIResponse<Comment[]>>
}

export class CommentService extends BaseAPI implements ICommentService {

  constructor (authService: IAuthService) {
    super(authService);
  }

  async createReplyToPost (comment: string, slug: string): Promise<APIResponse<void>> {
    try {
      await this.post('/comments', { comment }, { slug }, { 
        authorization: this.authService.getToken('access-token') 
      });
      return right(Result.ok<void>());
    } catch (err) {
      return left(err.response ? err.response.data.message : "Connection failed")
    }
  }

  async createReplyToComment (text: string, parentCommentId: string): Promise<APIResponse<void>> {
    return right(Result.ok<void>());
  }

  async getCommentsBySlug (slug: string, offset?: number): Promise<APIResponse<Comment[]>> {
    try {
      const response = await this.get('/comments', { offset, slug });
      return right(Result.ok<Comment[]>(
        response.data.comments.map((c: CommentDTO) => CommentUtil.toViewModel(c)))
      );
    } catch (err) {
      return left(err.response ? err.response.data.message : "Connection failed")
    }
  }

}