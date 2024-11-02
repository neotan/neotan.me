// This file is auto-generated by @hey-api/openapi-ts

export type Page = {
    readonly id: string;
    title: string;
    pageName?: string;
    description?: string;
    slug?: string;
    repoUrl?: string;
    homepage?: string;
    imageSrc?: string;
    ordering?: number;
    className?: string;
    published?: boolean;
    imgClassName?: string;
    /**
     * List of technologies used
     */
    techStack?: Array<(string)>;
    data?: unknown;
    /**
     * List of tags for this page
     */
    tags?: Array<(string)>;
    status?: StatusEnum;
    readonly created_at: string;
    readonly updated_at: string;
};

export type PatchedPage = {
    readonly id?: string;
    title?: string;
    pageName?: string;
    description?: string;
    slug?: string;
    repoUrl?: string;
    homepage?: string;
    imageSrc?: string;
    ordering?: number;
    className?: string;
    published?: boolean;
    imgClassName?: string;
    /**
     * List of technologies used
     */
    techStack?: Array<(string)>;
    data?: unknown;
    /**
     * List of tags for this page
     */
    tags?: Array<(string)>;
    status?: StatusEnum;
    readonly created_at?: string;
    readonly updated_at?: string;
};

export type PatchedPost = {
    readonly id?: string;
    title?: string;
    subtitle?: string;
    slug?: string;
    featured_image_url?: string;
    featured_image_caption?: string;
    featured?: boolean;
    content?: string;
    author?: string;
    status?: StatusEnum;
    published_at?: (string) | null;
    readonly created_at?: string;
    readonly updated_at?: string;
    /**
     * List of tags for this post
     */
    tags?: Array<(string)>;
};

export type Post = {
    readonly id: string;
    title: string;
    subtitle?: string;
    slug?: string;
    featured_image_url?: string;
    featured_image_caption?: string;
    featured?: boolean;
    content?: string;
    author?: string;
    status?: StatusEnum;
    published_at?: (string) | null;
    readonly created_at: string;
    readonly updated_at: string;
    /**
     * List of tags for this post
     */
    tags?: Array<(string)>;
};

/**
 * * `draft` - Draft
 * * `published` - Published
 */
export type StatusEnum = 'draft' | 'published';

export type BlogPagesListData = {
    query?: {
        description?: string;
        /**
         * Which field to use when ordering the results.
         */
        ordering?: string;
        pageName?: string;
        published?: boolean;
        slug?: string;
        status?: string;
        tags?: string;
        techStack?: string;
        title?: string;
    };
};

export type BlogPagesListResponse = (Array<Page>);

export type BlogPagesListError = unknown;

export type BlogPagesCreateData = {
    body: Page;
};

export type BlogPagesCreateResponse = (Page);

export type BlogPagesCreateError = unknown;

export type BlogPagesRetrieveData = {
    path: {
        id: string;
    };
};

export type BlogPagesRetrieveResponse = (Page);

export type BlogPagesRetrieveError = unknown;

export type BlogPagesUpdateData = {
    body: Page;
    path: {
        id: string;
    };
};

export type BlogPagesUpdateResponse = (Page);

export type BlogPagesUpdateError = unknown;

export type BlogPagesPartialUpdateData = {
    body?: PatchedPage;
    path: {
        id: string;
    };
};

export type BlogPagesPartialUpdateResponse = (Page);

export type BlogPagesPartialUpdateError = unknown;

export type BlogPagesDestroyData = {
    path: {
        id: string;
    };
};

export type BlogPagesDestroyResponse = (void);

export type BlogPagesDestroyError = unknown;

export type BlogPostsListData = {
    query?: {
        author?: string;
        content?: string;
        featured?: boolean;
        /**
         * Which field to use when ordering the results.
         */
        ordering?: string;
        published_at_after?: string;
        published_at_before?: string;
        slug?: string;
        status?: string;
        tags?: string;
        title?: string;
    };
};

export type BlogPostsListResponse = (Array<Post>);

export type BlogPostsListError = unknown;

export type BlogPostsCreateData = {
    body: Post;
};

export type BlogPostsCreateResponse = (Post);

export type BlogPostsCreateError = unknown;

export type BlogPostsRetrieveData = {
    path: {
        id: string;
    };
};

export type BlogPostsRetrieveResponse = (Post);

export type BlogPostsRetrieveError = unknown;

export type BlogPostsUpdateData = {
    body: Post;
    path: {
        id: string;
    };
};

export type BlogPostsUpdateResponse = (Post);

export type BlogPostsUpdateError = unknown;

export type BlogPostsPartialUpdateData = {
    body?: PatchedPost;
    path: {
        id: string;
    };
};

export type BlogPostsPartialUpdateResponse = (Post);

export type BlogPostsPartialUpdateError = unknown;

export type BlogPostsDestroyData = {
    path: {
        id: string;
    };
};

export type BlogPostsDestroyResponse = (void);

export type BlogPostsDestroyError = unknown;

export type SchemaRetrieveData = {
    query?: {
        format?: 'json' | 'yaml';
        lang?: 'af' | 'ar' | 'ar-dz' | 'ast' | 'az' | 'be' | 'bg' | 'bn' | 'br' | 'bs' | 'ca' | 'ckb' | 'cs' | 'cy' | 'da' | 'de' | 'dsb' | 'el' | 'en' | 'en-au' | 'en-gb' | 'eo' | 'es' | 'es-ar' | 'es-co' | 'es-mx' | 'es-ni' | 'es-ve' | 'et' | 'eu' | 'fa' | 'fi' | 'fr' | 'fy' | 'ga' | 'gd' | 'gl' | 'he' | 'hi' | 'hr' | 'hsb' | 'hu' | 'hy' | 'ia' | 'id' | 'ig' | 'io' | 'is' | 'it' | 'ja' | 'ka' | 'kab' | 'kk' | 'km' | 'kn' | 'ko' | 'ky' | 'lb' | 'lt' | 'lv' | 'mk' | 'ml' | 'mn' | 'mr' | 'ms' | 'my' | 'nb' | 'ne' | 'nl' | 'nn' | 'os' | 'pa' | 'pl' | 'pt' | 'pt-br' | 'ro' | 'ru' | 'sk' | 'sl' | 'sq' | 'sr' | 'sr-latn' | 'sv' | 'sw' | 'ta' | 'te' | 'tg' | 'th' | 'tk' | 'tr' | 'tt' | 'udm' | 'ug' | 'uk' | 'ur' | 'uz' | 'vi' | 'zh-hans' | 'zh-hant';
    };
};

export type SchemaRetrieveResponse = ({
    [key: string]: unknown;
});

export type SchemaRetrieveError = unknown;

export type $OpenApiTs = {
    '/api/blog/pages/': {
        get: {
            req: BlogPagesListData;
            res: {
                '200': Array<Page>;
            };
        };
        post: {
            req: BlogPagesCreateData;
            res: {
                '201': Page;
            };
        };
    };
    '/api/blog/pages/{id}/': {
        get: {
            req: BlogPagesRetrieveData;
            res: {
                '200': Page;
            };
        };
        put: {
            req: BlogPagesUpdateData;
            res: {
                '200': Page;
            };
        };
        patch: {
            req: BlogPagesPartialUpdateData;
            res: {
                '200': Page;
            };
        };
        delete: {
            req: BlogPagesDestroyData;
            res: {
                /**
                 * No response body
                 */
                '204': void;
            };
        };
    };
    '/api/blog/posts/': {
        get: {
            req: BlogPostsListData;
            res: {
                '200': Array<Post>;
            };
        };
        post: {
            req: BlogPostsCreateData;
            res: {
                '201': Post;
            };
        };
    };
    '/api/blog/posts/{id}/': {
        get: {
            req: BlogPostsRetrieveData;
            res: {
                '200': Post;
            };
        };
        put: {
            req: BlogPostsUpdateData;
            res: {
                '200': Post;
            };
        };
        patch: {
            req: BlogPostsPartialUpdateData;
            res: {
                '200': Post;
            };
        };
        delete: {
            req: BlogPostsDestroyData;
            res: {
                /**
                 * No response body
                 */
                '204': void;
            };
        };
    };
    '/api/schema/': {
        get: {
            req: SchemaRetrieveData;
            res: {
                '200': {
                    [key: string]: unknown;
                };
            };
        };
    };
};