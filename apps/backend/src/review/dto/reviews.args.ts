import { ArgsType, Field } from '@nestjs/graphql'
import { SortOrder } from 'src/common/model/sort-order.enum'
import { PaginationArgs } from 'src/common/dto/pagination.args'
import { ReviewOrderBy } from 'src/common/model/review-order-by.enum'

@ArgsType()
export class ReviewsArgs extends PaginationArgs {
   @Field(() => ReviewOrderBy, {
      nullable: true,
      defaultValue: ReviewOrderBy.createdAt,
   })
   orderBy?: ReviewOrderBy

   @Field(() => SortOrder, { nullable: true, defaultValue: SortOrder.desc })
   sortOrder?: SortOrder
}
