import { SetMetadata } from '@nestjs/common'

export const IS_OPTIONAL_AUTH = 'optionalAuth'
export const OptionalAuth = () => SetMetadata(IS_OPTIONAL_AUTH, true)
