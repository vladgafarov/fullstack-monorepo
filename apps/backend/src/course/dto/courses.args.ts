import { ArgsType, Field } from '@nestjs/graphql'
import { CourseOrderBy } from 'src/common/model/course-order-by.enum'
import { SortOrder } from 'src/common/model/sort-order.enum'
import { PaginationArgs } from 'src/common/dto/pagination.args'

@ArgsType()
export class CoursesArgs extends PaginationArgs {
   @Field(() => CourseOrderBy, {
      nullable: true,
      defaultValue: CourseOrderBy.createdAt,
   })
   orderBy?: CourseOrderBy

   @Field(() => SortOrder, { nullable: true, defaultValue: SortOrder.desc })
   sortOrder?: SortOrder

   @Field({ nullable: true })
   title?: string
}
