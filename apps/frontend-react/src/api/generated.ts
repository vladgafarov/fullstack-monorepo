import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
import { fetchData } from '@api/fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AuthInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type ChangePasswordInput = {
  password: Scalars['String'];
};

export type Course = {
  __typename?: 'Course';
  _count: CourseCount;
  count: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  currentUser?: Maybe<Scalars['Boolean']>;
  currentUserReview?: Maybe<Scalars['Boolean']>;
  description: Scalars['String'];
  discount?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  images?: Maybe<Scalars['String']>;
  mainImage?: Maybe<Scalars['String']>;
  price: Scalars['Int'];
  rating?: Maybe<Scalars['Float']>;
  reviews: Array<Review>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userCount: Scalars['Int'];
  users: Array<User>;
};

export type CourseCount = {
  __typename?: 'CourseCount';
  reviews: Scalars['Int'];
  users: Scalars['Int'];
};

/** Order by for courses */
export enum CourseOrderBy {
  CreatedAt = 'createdAt',
  Discount = 'discount',
  Id = 'id',
  Price = 'price',
  Rating = 'rating',
  Reviews = 'reviews',
  Title = 'title',
  Users = 'users'
}

export type CreateCourseInput = {
  description: Scalars['String'];
  discount?: InputMaybe<Scalars['Int']>;
  images?: InputMaybe<Scalars['String']>;
  mainImage?: InputMaybe<Scalars['String']>;
  price: Scalars['Int'];
  title: Scalars['String'];
  users?: InputMaybe<Array<Scalars['ID']>>;
};

export type CreateReviewInput = {
  courseId: Scalars['Int'];
  rating: Scalars['Int'];
  text?: InputMaybe<Scalars['String']>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  role?: InputMaybe<UserRole>;
};

export type CurrentUserUnion = User | UserEmpty;

export type JwtPayload = {
  __typename?: 'JwtPayload';
  email: Scalars['String'];
  exp: Scalars['Int'];
  iat: Scalars['Int'];
  id: Scalars['String'];
  role: UserRole;
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: User;
  confirmUser: User;
  createCourse: Course;
  createReview: Review;
  createUser: User;
  logIn: Tokens;
  logOut: User;
  removeCourse: Course;
  removeReview: Review;
  removeUser: User;
  requestPasswordReset: Scalars['Boolean'];
  resetPassword: JwtPayload;
  signOutFromCourse: Course;
  signUp: Tokens;
  signUpForCourse: Course;
  updateReview: Review;
  updateUser: User;
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationConfirmUserArgs = {
  token: Scalars['String'];
};


export type MutationCreateCourseArgs = {
  data: CreateCourseInput;
  file?: InputMaybe<Scalars['Upload']>;
};


export type MutationCreateReviewArgs = {
  data: CreateReviewInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationLogInArgs = {
  data: AuthInput;
};


export type MutationRemoveCourseArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveReviewArgs = {
  id: Scalars['String'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['String'];
};


export type MutationRequestPasswordResetArgs = {
  data: RequestPasswordInput;
};


export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
  token: Scalars['String'];
};


export type MutationSignOutFromCourseArgs = {
  courseId: Scalars['Float'];
};


export type MutationSignUpArgs = {
  data: CreateUserInput;
};


export type MutationSignUpForCourseArgs = {
  courseId: Scalars['Float'];
};


export type MutationUpdateReviewArgs = {
  data: UpdateReviewInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  course: Course;
  courses: Array<Course>;
  currentUser: CurrentUserUnion;
  refreshTokens: Tokens;
  review: Review;
  /** For admin purposes */
  reviews: Array<Review>;
  user: User;
  users: Array<User>;
};


export type QueryCourseArgs = {
  id: Scalars['Float'];
};


export type QueryCoursesArgs = {
  orderBy?: InputMaybe<CourseOrderBy>;
  skip?: InputMaybe<Scalars['Int']>;
  sortOrder?: InputMaybe<SortOrder>;
  take?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
};


export type QueryReviewArgs = {
  id: Scalars['String'];
};


export type QueryReviewsArgs = {
  orderBy?: InputMaybe<ReviewOrderBy>;
  skip?: InputMaybe<Scalars['Int']>;
  sortOrder?: InputMaybe<SortOrder>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryUsersArgs = {
  orderBy?: InputMaybe<UserOrderBy>;
  skip?: InputMaybe<Scalars['Int']>;
  sortOrder?: InputMaybe<SortOrder>;
  take?: InputMaybe<Scalars['Int']>;
};

export type RequestPasswordInput = {
  email: Scalars['String'];
};

export type ResetPasswordInput = {
  password: Scalars['String'];
  repeatPassword: Scalars['String'];
};

export type Review = {
  __typename?: 'Review';
  count: Scalars['Int'];
  course: Course;
  courseId: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  currentUser?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  rating: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user: ReviewUser;
  userId: Scalars['String'];
};

/** Order by for reviews */
export enum ReviewOrderBy {
  Course = 'course',
  CreatedAt = 'createdAt',
  Id = 'id',
  Rating = 'rating',
  Text = 'text',
  User = 'user'
}

export type ReviewUser = {
  __typename?: 'ReviewUser';
  id: Scalars['String'];
  lastName: Scalars['String'];
  name: Scalars['String'];
};

/** Order of sorting */
export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type Tokens = {
  __typename?: 'Tokens';
  access_token: Scalars['String'];
  refresh_token: Scalars['String'];
};

export type UpdateReviewInput = {
  id: Scalars['String'];
  rating?: InputMaybe<Scalars['Int']>;
  text?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
};

export type User = {
  __typename?: 'User';
  _count: UserCount;
  confirmTokenHash?: Maybe<Scalars['String']>;
  count: Scalars['Int'];
  courses: Array<Course>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  hashedRt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  passwordHash: Scalars['String'];
  reviews: Array<Review>;
  role: UserRole;
  updatedAt: Scalars['DateTime'];
};


export type UserCoursesArgs = {
  orderBy?: InputMaybe<CourseOrderBy>;
  skip?: InputMaybe<Scalars['Int']>;
  sortOrder?: InputMaybe<SortOrder>;
  take?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
};


export type UserReviewsArgs = {
  orderBy?: InputMaybe<ReviewOrderBy>;
  skip?: InputMaybe<Scalars['Int']>;
  sortOrder?: InputMaybe<SortOrder>;
  take?: InputMaybe<Scalars['Int']>;
};

export type UserCount = {
  __typename?: 'UserCount';
  courses: Scalars['Float'];
  reviews: Scalars['Float'];
};

export type UserEmpty = {
  __typename?: 'UserEmpty';
  user: Scalars['Boolean'];
};

/** Order by for users */
export enum UserOrderBy {
  Courses = 'courses',
  Email = 'email',
  Id = 'id',
  LastName = 'lastName',
  Name = 'name',
  Reviews = 'reviews',
  Role = 'role'
}

/** Role of user */
export enum UserRole {
  Admin = 'ADMIN',
  Tester = 'TESTER',
  User = 'USER'
}

export type ChangePasswordMutationVariables = Exact<{
  password: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'User', id: string, name: string, email: string } };

export type ConfirmUserMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ConfirmUserMutation = { __typename?: 'Mutation', confirmUser: { __typename?: 'User', email: string } };

export type CreateCourseMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Int'];
  discount?: InputMaybe<Scalars['Int']>;
  file?: InputMaybe<Scalars['Upload']>;
}>;


export type CreateCourseMutation = { __typename?: 'Mutation', createCourse: { __typename?: 'Course', id: number, title: string } };

export type CreateReviewMutationVariables = Exact<{
  rating: Scalars['Int'];
  text?: InputMaybe<Scalars['String']>;
  courseId: Scalars['Int'];
}>;


export type CreateReviewMutation = { __typename?: 'Mutation', createReview: { __typename?: 'Review', id: string } };

export type DeleteReviewMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteReviewMutation = { __typename?: 'Mutation', removeReview: { __typename?: 'Review', id: string, courseId: string, userId: string } };

export type LogInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LogInMutation = { __typename?: 'Mutation', logIn: { __typename?: 'Tokens', access_token: string, refresh_token: string } };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logOut: { __typename?: 'User', name: string } };

export type RemoveCourseMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveCourseMutation = { __typename?: 'Mutation', removeCourse: { __typename?: 'Course', id: number, title: string } };

export type RemoveReviewMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveReviewMutation = { __typename?: 'Mutation', removeReview: { __typename?: 'Review', id: string, rating: number } };

export type RemoveUserMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: { __typename?: 'User', id: string, name: string } };

export type RequestPasswordResetMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type RequestPasswordResetMutation = { __typename?: 'Mutation', requestPasswordReset: boolean };

export type ResetPasswordMutationVariables = Exact<{
  password: Scalars['String'];
  repeatPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'JwtPayload', email: string } };

export type SignOutFromCourseMutationVariables = Exact<{
  courseId: Scalars['Float'];
}>;


export type SignOutFromCourseMutation = { __typename?: 'Mutation', signOutFromCourse: { __typename?: 'Course', id: number, title: string } };

export type SignUpForCourseMutationVariables = Exact<{
  courseId: Scalars['Float'];
}>;


export type SignUpForCourseMutation = { __typename?: 'Mutation', signUpForCourse: { __typename?: 'Course', id: number, title: string } };

export type SignUpMutationVariables = Exact<{
  name: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'Tokens', access_token: string, refresh_token: string } };

export type UpdateReviewMutationVariables = Exact<{
  id: Scalars['String'];
  rating?: InputMaybe<Scalars['Int']>;
  text?: InputMaybe<Scalars['String']>;
}>;


export type UpdateReviewMutation = { __typename?: 'Mutation', updateReview: { __typename?: 'Review', id: string, rating: number, text?: string | null, userId: string, courseId: string } };

export type CurrentUserQueryVariables = Exact<{
  skipCourses?: InputMaybe<Scalars['Int']>;
  takeCourses?: InputMaybe<Scalars['Int']>;
  skipReviews?: InputMaybe<Scalars['Int']>;
  takeReviews?: InputMaybe<Scalars['Int']>;
}>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: string, email: string, name: string, lastName: string, role: UserRole, _count: { __typename?: 'UserCount', courses: number, reviews: number }, courses: Array<{ __typename?: 'Course', count: number, id: number, title: string, description: string, price: number, discount?: number | null, mainImage?: string | null }>, reviews: Array<{ __typename?: 'Review', id: string, text?: string | null, rating: number, createdAt: any, currentUser?: boolean | null, course: { __typename?: 'Course', id: number, title: string } }> } | { __typename?: 'UserEmpty' } };

export type GetCourseQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetCourseQuery = { __typename?: 'Query', course: { __typename?: 'Course', id: number, title: string, description: string, price: number, discount?: number | null, rating?: number | null, currentUser?: boolean | null, currentUserReview?: boolean | null, userCount: number, mainImage?: string | null, _count: { __typename?: 'CourseCount', users: number, reviews: number }, reviews: Array<{ __typename?: 'Review', rating: number, id: string, text?: string | null, createdAt: any, currentUser?: boolean | null, user: { __typename?: 'ReviewUser', name: string, lastName: string } }> } };

export type GetCoursesQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CourseOrderBy>;
  sortOrder?: InputMaybe<SortOrder>;
  title?: InputMaybe<Scalars['String']>;
}>;


export type GetCoursesQuery = { __typename?: 'Query', courses: Array<{ __typename?: 'Course', id: number, title: string, description: string, price: number, discount?: number | null, currentUser?: boolean | null, count: number, mainImage?: string | null, rating?: number | null, createdAt: any, _count: { __typename?: 'CourseCount', users: number, reviews: number } }> };

export type GetReviewsQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ReviewOrderBy>;
  sortOrder?: InputMaybe<SortOrder>;
}>;


export type GetReviewsQuery = { __typename?: 'Query', reviews: Array<{ __typename?: 'Review', id: string, rating: number, text?: string | null, count: number, course: { __typename?: 'Course', title: string, id: number }, user: { __typename?: 'ReviewUser', name: string, lastName: string, id: string } }> };

export type GetUsersQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  sortOrder?: InputMaybe<SortOrder>;
}>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, count: number, name: string, lastName: string, _count: { __typename?: 'UserCount', courses: number, reviews: number } }> };


export const ChangePasswordDocument = `
    mutation ChangePassword($password: String!) {
  changePassword(data: {password: $password}) {
    id
    name
    email
  }
}
    `;
export const useChangePasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ChangePasswordMutation, TError, ChangePasswordMutationVariables, TContext>) =>
    useMutation<ChangePasswordMutation, TError, ChangePasswordMutationVariables, TContext>(
      ['ChangePassword'],
      (variables?: ChangePasswordMutationVariables) => fetchData<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, variables)(),
      options
    );
export const ConfirmUserDocument = `
    mutation ConfirmUser($token: String!) {
  confirmUser(token: $token) {
    email
  }
}
    `;
export const useConfirmUserMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ConfirmUserMutation, TError, ConfirmUserMutationVariables, TContext>) =>
    useMutation<ConfirmUserMutation, TError, ConfirmUserMutationVariables, TContext>(
      ['ConfirmUser'],
      (variables?: ConfirmUserMutationVariables) => fetchData<ConfirmUserMutation, ConfirmUserMutationVariables>(ConfirmUserDocument, variables)(),
      options
    );
export const CreateCourseDocument = `
    mutation CreateCourse($title: String!, $description: String!, $price: Int!, $discount: Int, $file: Upload) {
  createCourse(
    data: {title: $title, description: $description, price: $price, discount: $discount}
    file: $file
  ) {
    id
    title
  }
}
    `;
export const useCreateCourseMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateCourseMutation, TError, CreateCourseMutationVariables, TContext>) =>
    useMutation<CreateCourseMutation, TError, CreateCourseMutationVariables, TContext>(
      ['CreateCourse'],
      (variables?: CreateCourseMutationVariables) => fetchData<CreateCourseMutation, CreateCourseMutationVariables>(CreateCourseDocument, variables)(),
      options
    );
export const CreateReviewDocument = `
    mutation CreateReview($rating: Int!, $text: String, $courseId: Int!) {
  createReview(data: {rating: $rating, text: $text, courseId: $courseId}) {
    id
  }
}
    `;
export const useCreateReviewMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateReviewMutation, TError, CreateReviewMutationVariables, TContext>) =>
    useMutation<CreateReviewMutation, TError, CreateReviewMutationVariables, TContext>(
      ['CreateReview'],
      (variables?: CreateReviewMutationVariables) => fetchData<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument, variables)(),
      options
    );
export const DeleteReviewDocument = `
    mutation DeleteReview($id: String!) {
  removeReview(id: $id) {
    id
    courseId
    userId
  }
}
    `;
export const useDeleteReviewMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteReviewMutation, TError, DeleteReviewMutationVariables, TContext>) =>
    useMutation<DeleteReviewMutation, TError, DeleteReviewMutationVariables, TContext>(
      ['DeleteReview'],
      (variables?: DeleteReviewMutationVariables) => fetchData<DeleteReviewMutation, DeleteReviewMutationVariables>(DeleteReviewDocument, variables)(),
      options
    );
export const LogInDocument = `
    mutation LogIn($email: String!, $password: String!) {
  logIn(data: {email: $email, password: $password}) {
    access_token
    refresh_token
  }
}
    `;
export const useLogInMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LogInMutation, TError, LogInMutationVariables, TContext>) =>
    useMutation<LogInMutation, TError, LogInMutationVariables, TContext>(
      ['LogIn'],
      (variables?: LogInMutationVariables) => fetchData<LogInMutation, LogInMutationVariables>(LogInDocument, variables)(),
      options
    );
export const LogOutDocument = `
    mutation LogOut {
  logOut {
    name
  }
}
    `;
export const useLogOutMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LogOutMutation, TError, LogOutMutationVariables, TContext>) =>
    useMutation<LogOutMutation, TError, LogOutMutationVariables, TContext>(
      ['LogOut'],
      (variables?: LogOutMutationVariables) => fetchData<LogOutMutation, LogOutMutationVariables>(LogOutDocument, variables)(),
      options
    );
export const RemoveCourseDocument = `
    mutation RemoveCourse($id: Int!) {
  removeCourse(id: $id) {
    id
    title
  }
}
    `;
export const useRemoveCourseMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<RemoveCourseMutation, TError, RemoveCourseMutationVariables, TContext>) =>
    useMutation<RemoveCourseMutation, TError, RemoveCourseMutationVariables, TContext>(
      ['RemoveCourse'],
      (variables?: RemoveCourseMutationVariables) => fetchData<RemoveCourseMutation, RemoveCourseMutationVariables>(RemoveCourseDocument, variables)(),
      options
    );
export const RemoveReviewDocument = `
    mutation RemoveReview($id: String!) {
  removeReview(id: $id) {
    id
    rating
  }
}
    `;
export const useRemoveReviewMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<RemoveReviewMutation, TError, RemoveReviewMutationVariables, TContext>) =>
    useMutation<RemoveReviewMutation, TError, RemoveReviewMutationVariables, TContext>(
      ['RemoveReview'],
      (variables?: RemoveReviewMutationVariables) => fetchData<RemoveReviewMutation, RemoveReviewMutationVariables>(RemoveReviewDocument, variables)(),
      options
    );
export const RemoveUserDocument = `
    mutation RemoveUser($id: String!) {
  removeUser(id: $id) {
    id
    name
  }
}
    `;
export const useRemoveUserMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<RemoveUserMutation, TError, RemoveUserMutationVariables, TContext>) =>
    useMutation<RemoveUserMutation, TError, RemoveUserMutationVariables, TContext>(
      ['RemoveUser'],
      (variables?: RemoveUserMutationVariables) => fetchData<RemoveUserMutation, RemoveUserMutationVariables>(RemoveUserDocument, variables)(),
      options
    );
export const RequestPasswordResetDocument = `
    mutation RequestPasswordReset($email: String!) {
  requestPasswordReset(data: {email: $email})
}
    `;
export const useRequestPasswordResetMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<RequestPasswordResetMutation, TError, RequestPasswordResetMutationVariables, TContext>) =>
    useMutation<RequestPasswordResetMutation, TError, RequestPasswordResetMutationVariables, TContext>(
      ['RequestPasswordReset'],
      (variables?: RequestPasswordResetMutationVariables) => fetchData<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>(RequestPasswordResetDocument, variables)(),
      options
    );
export const ResetPasswordDocument = `
    mutation ResetPassword($password: String!, $repeatPassword: String!, $token: String!) {
  resetPassword(
    data: {password: $password, repeatPassword: $repeatPassword}
    token: $token
  ) {
    email
  }
}
    `;
export const useResetPasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ResetPasswordMutation, TError, ResetPasswordMutationVariables, TContext>) =>
    useMutation<ResetPasswordMutation, TError, ResetPasswordMutationVariables, TContext>(
      ['ResetPassword'],
      (variables?: ResetPasswordMutationVariables) => fetchData<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, variables)(),
      options
    );
export const SignOutFromCourseDocument = `
    mutation SignOutFromCourse($courseId: Float!) {
  signOutFromCourse(courseId: $courseId) {
    id
    title
  }
}
    `;
export const useSignOutFromCourseMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SignOutFromCourseMutation, TError, SignOutFromCourseMutationVariables, TContext>) =>
    useMutation<SignOutFromCourseMutation, TError, SignOutFromCourseMutationVariables, TContext>(
      ['SignOutFromCourse'],
      (variables?: SignOutFromCourseMutationVariables) => fetchData<SignOutFromCourseMutation, SignOutFromCourseMutationVariables>(SignOutFromCourseDocument, variables)(),
      options
    );
export const SignUpForCourseDocument = `
    mutation SignUpForCourse($courseId: Float!) {
  signUpForCourse(courseId: $courseId) {
    id
    title
  }
}
    `;
export const useSignUpForCourseMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SignUpForCourseMutation, TError, SignUpForCourseMutationVariables, TContext>) =>
    useMutation<SignUpForCourseMutation, TError, SignUpForCourseMutationVariables, TContext>(
      ['SignUpForCourse'],
      (variables?: SignUpForCourseMutationVariables) => fetchData<SignUpForCourseMutation, SignUpForCourseMutationVariables>(SignUpForCourseDocument, variables)(),
      options
    );
export const SignUpDocument = `
    mutation SignUp($name: String!, $lastName: String!, $email: String!, $password: String!) {
  signUp(
    data: {name: $name, lastName: $lastName, email: $email, password: $password}
  ) {
    access_token
    refresh_token
  }
}
    `;
export const useSignUpMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SignUpMutation, TError, SignUpMutationVariables, TContext>) =>
    useMutation<SignUpMutation, TError, SignUpMutationVariables, TContext>(
      ['SignUp'],
      (variables?: SignUpMutationVariables) => fetchData<SignUpMutation, SignUpMutationVariables>(SignUpDocument, variables)(),
      options
    );
export const UpdateReviewDocument = `
    mutation UpdateReview($id: String!, $rating: Int, $text: String) {
  updateReview(data: {id: $id, rating: $rating, text: $text}) {
    id
    rating
    text
    userId
    courseId
  }
}
    `;
export const useUpdateReviewMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateReviewMutation, TError, UpdateReviewMutationVariables, TContext>) =>
    useMutation<UpdateReviewMutation, TError, UpdateReviewMutationVariables, TContext>(
      ['UpdateReview'],
      (variables?: UpdateReviewMutationVariables) => fetchData<UpdateReviewMutation, UpdateReviewMutationVariables>(UpdateReviewDocument, variables)(),
      options
    );
export const CurrentUserDocument = `
    query CurrentUser($skipCourses: Int, $takeCourses: Int, $skipReviews: Int, $takeReviews: Int) {
  currentUser {
    ... on User {
      id
      email
      name
      lastName
      role
      _count {
        courses
        reviews
      }
      courses(skip: $skipCourses, take: $takeCourses) {
        count
        id
        title
        description
        price
        discount
        mainImage
      }
      reviews(skip: $skipReviews, take: $takeReviews) {
        id
        text
        rating
        createdAt
        currentUser
        course {
          id
          title
        }
      }
    }
  }
}
    `;
export const useCurrentUserQuery = <
      TData = CurrentUserQuery,
      TError = unknown
    >(
      variables?: CurrentUserQueryVariables,
      options?: UseQueryOptions<CurrentUserQuery, TError, TData>
    ) =>
    useQuery<CurrentUserQuery, TError, TData>(
      variables === undefined ? ['CurrentUser'] : ['CurrentUser', variables],
      fetchData<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, variables),
      options
    );
export const GetCourseDocument = `
    query GetCourse($id: Float!) {
  course(id: $id) {
    id
    title
    description
    price
    discount
    rating
    currentUser
    currentUserReview
    userCount
    mainImage
    _count {
      users
      reviews
    }
    reviews {
      rating
      id
      text
      createdAt
      currentUser
      user {
        name
        lastName
      }
    }
  }
}
    `;
export const useGetCourseQuery = <
      TData = GetCourseQuery,
      TError = unknown
    >(
      variables: GetCourseQueryVariables,
      options?: UseQueryOptions<GetCourseQuery, TError, TData>
    ) =>
    useQuery<GetCourseQuery, TError, TData>(
      ['GetCourse', variables],
      fetchData<GetCourseQuery, GetCourseQueryVariables>(GetCourseDocument, variables),
      options
    );
export const GetCoursesDocument = `
    query GetCourses($take: Int, $skip: Int, $orderBy: CourseOrderBy, $sortOrder: SortOrder, $title: String) {
  courses(
    take: $take
    skip: $skip
    orderBy: $orderBy
    sortOrder: $sortOrder
    title: $title
  ) {
    id
    title
    description
    price
    discount
    currentUser
    count
    mainImage
    rating
    createdAt
    _count {
      users
      reviews
    }
  }
}
    `;
export const useGetCoursesQuery = <
      TData = GetCoursesQuery,
      TError = unknown
    >(
      variables?: GetCoursesQueryVariables,
      options?: UseQueryOptions<GetCoursesQuery, TError, TData>
    ) =>
    useQuery<GetCoursesQuery, TError, TData>(
      variables === undefined ? ['GetCourses'] : ['GetCourses', variables],
      fetchData<GetCoursesQuery, GetCoursesQueryVariables>(GetCoursesDocument, variables),
      options
    );
export const GetReviewsDocument = `
    query GetReviews($take: Int, $skip: Int, $orderBy: ReviewOrderBy, $sortOrder: SortOrder) {
  reviews(take: $take, skip: $skip, orderBy: $orderBy, sortOrder: $sortOrder) {
    id
    rating
    text
    count
    course {
      title
      id
    }
    user {
      name
      lastName
      id
    }
  }
}
    `;
export const useGetReviewsQuery = <
      TData = GetReviewsQuery,
      TError = unknown
    >(
      variables?: GetReviewsQueryVariables,
      options?: UseQueryOptions<GetReviewsQuery, TError, TData>
    ) =>
    useQuery<GetReviewsQuery, TError, TData>(
      variables === undefined ? ['GetReviews'] : ['GetReviews', variables],
      fetchData<GetReviewsQuery, GetReviewsQueryVariables>(GetReviewsDocument, variables),
      options
    );
export const GetUsersDocument = `
    query GetUsers($take: Int, $skip: Int, $orderBy: UserOrderBy, $sortOrder: SortOrder) {
  users(take: $take, skip: $skip, orderBy: $orderBy, sortOrder: $sortOrder) {
    id
    count
    name
    lastName
    _count {
      courses
      reviews
    }
  }
}
    `;
export const useGetUsersQuery = <
      TData = GetUsersQuery,
      TError = unknown
    >(
      variables?: GetUsersQueryVariables,
      options?: UseQueryOptions<GetUsersQuery, TError, TData>
    ) =>
    useQuery<GetUsersQuery, TError, TData>(
      variables === undefined ? ['GetUsers'] : ['GetUsers', variables],
      fetchData<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, variables),
      options
    );