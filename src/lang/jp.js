// jp.js
import japaneseMessages from '@bicstone/ra-language-japanese';

const jpfull = {
  ra: {
    ...japaneseMessages.ra,
  },
  resources: {
    permission: {
      name: '権限',
      list: '権限一覧',
      fields: {
        id: 'ID',
        name: '名前',
        allow_ids: 'アクセス',
        resource: {
          name: 'リソース',
        },
        type: {
          name: 'タイプ',
        },
        created_at: '作成日時',
        created_by_id: '作成者',
      },
    },
    staff: {
      name: 'スタッフ',
      list: 'スタッフ一覧',
      fields: {
        id: 'ID',
        first_name: '名',
        last_name: '姓',
        email: 'メール',
        is_root: 'ルート',
        department_id: '部署',
        position_id: '位置',
        created_at: '作成日時',
        updated_at: '更新日時',
        created_by_id: '作成者',
        updated_by_id: '更新者',
      },
      tabs: {
        info: '基本情報',
        permission: '権限',
        group: 'グループ',
        history: '履歴',
      },
      buttons: {
        assign: '任命する',
      },
      labels: {
        all_allowed: 'すべてのレコードは許可されますか？',
        assign_permissions: '権限割り当て',
        assigned_permission: '割り当てられた権限',
        assign_groups: 'グループの割り当て',
        assigned_groups: '割り当てられたグループ',
        assign_staffs: 'スタッフの割り当て',
        assigned_staffs: '割り当てられたスタッフ',
      },
      messages: {
        root_access: 'こちらはルートスタッフです。全てにアクセス可能です。',
      },
    },
    'staff-position': {
      name: '位置',
      list: '位置一覧',
      tabs: {
        info: '基本情報',
        member: 'メンバー',
        history: '履歴',
      },
      fields: {
        id: 'ID',
        name: '名',
        description: '説明',
        created_at: '作成日時',
        updated_at: '更新日時',
        created_by_id: '作成者',
        updated_by_id: '更新者',
      },
    },
    'staff-department': {
      name: '部署',
      list: '部署一覧',
      tabs: {
        info: '基本情報',
        member: 'メンバー',
        history: '履歴',
      },
      fields: {
        id: 'ID',
        name: '名',
        description: '説明',
        created_at: '作成日時',
        updated_at: '更新日時',
        created_by_id: '作成者',
        updated_by_id: '更新者',
      },
    },
    group: {
      name: 'グループ',
      list: 'グループ一覧',
      fields: {
        id: 'ID',
        name: '名',
        description: '説明',
        created_at: '作成日時',
        updated_at: '更新日時',
        created_by_id: '作成者',
        updated_by_id: '更新者',
      },
      tabs: {
        info: '基本情報',
        permission: '権限',
        member: 'メンバー',
        history: '履歴',
      },
      buttons: {
        assign: '任命する',
      },
      labels: {
        all_allowed: 'すべてのレコードは許可されますか？',
        assign_permissions: '権限割り当て',
        assigned_permission: '割り当てられた権限',
      },
    },
    'ads-language': {
      name: '言語',
      list: '言語一覧',
      fields: {
        id: 'ID',
        name: '名',
        description: '説明',
        created_at: '作成日時',
        updated_at: '更新日時',
        created_by_id: '作成者',
        updated_by_id: '更新者',
      },
      tabs: {
        info: '基本情報',
        history: '履歴',
      },
    },
    'ads-platform': {
      name: 'プラットフォーム',
      list: 'プラットフォーム一覧',
      fields: {
        id: 'ID',
        name: '名',
        description: '説明',
        created_at: '作成日時',
        updated_at: '更新日時',
        created_by_id: '作成者',
        updated_by_id: '更新者',
      },
      tabs: {
        info: '基本情報',
        history: '履歴',
      },
    },
    'ads-tone': {
      name: 'トーン',
      list: 'トーン一覧',
      fields: {
        id: 'ID',
        name: '名',
        description: '説明',
        created_at: '作成日時',
        updated_at: '更新日時',
        created_by_id: '作成者',
        updated_by_id: '更新者',
      },
      tabs: {
        info: '基本情報',
        history: '履歴',
      },
    },
    'ads-target': {
      name: 'ターゲット',
      list: 'ターゲット一覧',
      fields: {
        id: 'ID',
        name: '名',
        description: '説明',
        created_at: '作成日時',
        updated_at: '更新日時',
        created_by_id: '作成者',
        updated_by_id: '更新者',
      },
      tabs: {
        info: '基本情報',
        history: '履歴',
      },
    },
    'ads-industry': {
      name: '業界',
      list: '業界一覧',
      fields: {
        id: 'ID',
        name: '名',
        description: '説明',
        created_at: '作成日時',
        updated_at: '更新日時',
        created_by_id: '作成者',
        updated_by_id: '更新者',
      },
      tabs: {
        info: '基本情報',
        history: '履歴',
      },
    },
    'ads-company-size': {
      name: '企業規模',
      list: '企業規模一覧',
      fields: {
        id: 'ID',
        name: '名',
        description: '説明',
        created_at: '作成日時',
        updated_at: '更新日時',
        created_by_id: '作成者',
        updated_by_id: '更新者',
      },
      tabs: {
        info: '基本情報',
        history: '履歴',
      },
    },
    'ads-company-type': {
      name: '企業タイプ',
      list: '企業タイプ一覧',
      fields: {
        id: 'ID',
        name: '名',
        description: '説明',
        created_at: '作成日時',
        updated_at: '更新日時',
        created_by_id: '作成者',
        updated_by_id: '更新者',
      },
      tabs: {
        info: '基本情報',
        history: '履歴',
      },
    },
    'ads-client-company': {
      name: 'クライアント',
      list: 'クライアント一覧',
      fields: {
        id: 'ID',
        name: '名',
        website_url: '会社URL',
        strength: '強み',
        others: 'その他の追加',
        industry_id: '業界',
        type_id: '企業タイプ',
        size_id: '企業規模',
        created_at: 'Created At',
        updated_at: 'Updated At',
        created_by_id: 'Created By',
        updated_by_id: 'Updated By',
      },
      tabs: {
        info: 'information',
        history: 'history',
      },
    },
  },
  pages: {
    auth: {
      login: {
        name: 'ログイン',
        fields: {
          email: 'メール',
          password: 'パスワード',
          remember_me: 'ログイン状態を保持する',
          login_btn_name: 'ログイン',
        },
      },
    },
  },
  menu: {
    employee_management: '人事管理',
    ads_gen_ai: '広告生成AI',
  },
  'Invalid Credentials': '認証情報が無効です。再試行してください。',
  'staff not found': 'スタッフは登録されていないか、削除されています。',
};

export default jpfull;
