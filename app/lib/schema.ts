import { z } from 'zod';

const phoneRegex = new RegExp(/^[0-9]{10,11}$/);

export const LoginSchema = z.object({
  email: z
    .string({ required_error: '이메일을 입력해주세요' })
    .min(1, { message: '이메일을 입력해주세요' })
    .email({ message: '이메일 형식이 올바르지 않습니다' }),
  password: z.string({ required_error: '비밀번호를 입력해주세요' }).min(1, { message: '비밀번호를 입력해주세요' }),
});

export const RegisterSchema = LoginSchema.extend({
  confirmPassword: z
    .string({ required_error: '비밀번호 확인을 입력해주세요' })
    .min(1, { message: '비밀번호 확인을 입력해주세요' }),
  nickname: z
    .string({ required_error: '닉네임을 입력해주세요' })
    .min(1, { message: '닉네임을 입력해주세요' })
    .max(15, { message: '15자 이내로 입력해주세요' }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: '비밀번호가 일치하지 않습니다',
});

export const AddressSchema = z.object({
  name: z
    .string({ required_error: '이름을 입력해주세요' })
    .min(2, { message: '올바른 이름을 입력해주세요. (2 - 50자)' })
    .max(50, { message: '올바른 이름을 입력해주세요. (2 - 50자)' }),
  phone: z.string().regex(phoneRegex, '정확한 휴대폰 번호를 입력해주세요.'),
  zipcode: z.string().min(1),
  address: z.string().min(1),
  details: z.string().min(1),
  checked: z.boolean(),
});

export const BuySchema = z.object({
  address: AddressSchema.omit({ checked: true }),
});
