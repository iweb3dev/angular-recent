import { EmailTemplateNames } from 'src/app/shared/models/email/email-template.models';
import { BLANK_TEMPLATE } from 'src/assets/email-templates/blank-template';
import { LAST_USED_TEMPLATE } from 'src/assets/email-templates/last-used-template';
import { TEMPLATE_1 } from 'src/assets/email-templates/template-1';
import { TEMPLATE_2 } from 'src/assets/email-templates/template-2';
import { TEMPLATE_3 } from 'src/assets/email-templates/template-3';
import { TEMPLATE_4 } from 'src/assets/email-templates/template-4';
import { TEMPLATE_5 } from 'src/assets/email-templates/template-5';

export const EMAIL_PREDEFINES: { name: string; img: string }[] = [
  { name: EmailTemplateNames.Last, img: '/assets/img/LastUsedTemplate.png' },
  {
    name: EmailTemplateNames.Blank,
    img: '/assets/img/CallingPostTemplateBlank.png',
  },
  {
    name: EmailTemplateNames.Fifth,
    img: '/assets/img/CallingPostTemplate5.png',
  },
  {
    name: EmailTemplateNames.First,
    img: '/assets/img/CallingPostTemplate1.png',
  },
  {
    name: EmailTemplateNames.Second,
    img: '/assets/img/CallingPostTemplate2.png',
  },
  {
    name: EmailTemplateNames.Third,
    img: '/assets/img/CallingPostTemplate3.png',
  },
  {
    name: EmailTemplateNames.Fourth,
    img: '/assets/img/CallingPostTemplate4.png',
  },
];

export const TEMPLATE_NAME_REFERENCE_MAP = {
  [EmailTemplateNames.Last]: LAST_USED_TEMPLATE,
  [EmailTemplateNames.Blank]: BLANK_TEMPLATE,
  [EmailTemplateNames.Fifth]: TEMPLATE_5,
  [EmailTemplateNames.Fourth]: TEMPLATE_4,
  [EmailTemplateNames.Third]: TEMPLATE_3,
  [EmailTemplateNames.Second]: TEMPLATE_2,
  [EmailTemplateNames.First]: TEMPLATE_1,
};
