import { ArgsType, Field } from '@nestjs/graphql'
import { ReviewOrderBy } from '../../common/model/review-order-by.enum'
import { SortOrder } from '../../common/model/sort-order.enum'
import { PaginationArgs } from '../../common/dto/pagination.args'

@ArgsType()
export class ReviewFilterArgs extends PaginationArgs {
   @Field(() => ReviewOrderBy, {
      nullable: true,
      defaultValue: ReviewOrderBy.createdAt,
   })
   orderBy?: ReviewOrderBy

   @Field(() => SortOrder, { nullable: true, defaultValue: SortOrder.desc })
   sortOrder?: SortOrder
}
