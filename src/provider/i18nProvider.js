import polyglotI18nProvider from 'ra-i18n-polyglot';
import en from 'ra-language-english';
import japaneseMessages from '@bicstone/ra-language-japanese';

const enfull = {
  ra: {
    ...en.ra,
  },
  resources: {
    staff: {
      name: 'Staff',
      list: 'Staff List',
      fields: {
        id: 'ID',
        first_name: 'First Name',
        last_name: 'Last Name',
        email: 'Email',
        department: 'Department',
        position_id: 'Position',
        created_at: 'Created At',
        updated_at: 'Updated At',
        created_by_id: 'Created By ID',
        updated_by_id: 'Updated By ID',
      },
    },
    'staff-position': {
      name: 'Staff Position',
      list: 'Staff Position List',
      fields: {
        id: 'ID',
        name: 'Name',
        description: 'Description',
        created_at: 'Created At',
        updated_at: 'Updated At',
        created_by_id: 'Created By ID',
        updated_by_id: 'Updated By ID',
      },
    },
  },
  'position_id does not exist': 'Position ID does not exist.',
};
const jpfull = {
  ra: {
    ...japaneseMessages.ra,
  },
  resources: {
    staff: {
      name: 'スタッフ',
      list: 'スタッフ一覧',
      fields: {
        id: 'ID',
        first_name: '名',
        last_name: '姓',
        email: 'メール',
        department: '部署',
        position_id: '役職',
        created_at: '作成日時',
        updated_at: '更新日時',
        created_by_id: '作成者ID',
        updated_by_id: '更新者ID',
      },
    },
    'staff-position': {
      name: 'スタッフの役職',
      list: '役職一覧',
      fields: {
        id: 'ID',
        name: '役職名',
        description: '役職説明',
        created_at: '作成日時',
        updated_at: '更新日時',
        created_by_id: '作成者ID',
        updated_by_id: '更新者ID',
      },
    },
  },
  'position_id does not exist': '指定されたポジションIDは存在しません。',
};

const translations = { en: enfull, jp: jpfull };

export const i18nProvider = polyglotI18nProvider(
  (locale) => translations[locale],
  'jp', // default locale
  [
    { locale: 'en', name: 'English' },
    { locale: 'jp', name: 'Japanese' },
  ],
);
