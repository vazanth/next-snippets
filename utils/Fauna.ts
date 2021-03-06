import faunadb from 'faunadb';
const faunaClient = new faunadb.Client({
  secret: process.env.FAUNA_SECRET,
});
const q = faunadb.query;

const getSnippets = async () => {
  const { data }: any = await faunaClient.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('snippets'))),
      q.Lambda('ref', q.Get(q.Var('ref')))
    )
  );
  const snippets = data.map((snip) => {
    snip.id = snip.ref.id;
    delete snip.ref;
    return snip;
  });
  return snippets;
};

const getSnippetById = async (id) => {
  const snippet: any = await faunaClient.query(
    q.Get(q.Ref(q.Collection('snippets'), id))
  );
  snippet.id = snippet.ref.id;
  delete snippet.ref;
  return snippet;
};

const getSnippetsByUser = async (userId) => {
  const { data }: any = await faunaClient.query(
    q.Map(
      q.Paginate(q.Match(q.Index('snippets_by_user'), userId)),
      q.Lambda('ref', q.Get(q.Var('ref')))
    )
  );

  const snippets = data.map((snippet) => {
    snippet.id = snippet.ref.id;
    delete snippet.ref;
    return snippet;
  });

  return snippets;
};

const getSnippetsByLanguage = async (language) => {
  console.log('language', language);
  const { data }: any = await faunaClient.query(
    q.Map(
      q.Paginate(q.Match(q.Index('snippets_by_language'), language)),
      q.Lambda('ref', q.Get(q.Var('ref')))
    )
  );

  const snippets = data.map((snippet) => {
    snippet.id = snippet.ref.id;
    delete snippet.ref;
    return snippet;
  });

  return snippets;
};

const createSnippet = async (code, language, description, name, userId) => {
  return await faunaClient.query(
    q.Create(q.Collection('snippets'), {
      data: { code, language, description, name, userId },
    })
  );
};

const updateSnippet = async (id, code, language, name, description) => {
  return await faunaClient.query(
    q.Update(q.Ref(q.Collection('snippets'), id), {
      data: {
        code,
        language,
        name,
        description,
      },
    })
  );
};

const deleteSnippet = async (id) => {
  return await faunaClient.query(q.Delete(q.Ref(q.Collection('snippets'), id)));
};

export {
  createSnippet,
  getSnippets,
  getSnippetsByUser,
  getSnippetsByLanguage,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
};
