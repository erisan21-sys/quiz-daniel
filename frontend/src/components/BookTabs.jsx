import { useBooks } from '../lib/books.js';

/**
 * Abas de seleção de livro (Oséias · Obadias · Jonas).
 * Com `allowAll`, inclui a aba "TODOS" (value '').
 */
export function BookTabs({ value, onChange, allowAll = false, label = 'Livro' }) {
  const books = useBooks();
  return (
    <div className="tabs" role="tablist" aria-label={label}>
      {allowAll && (
        <button
          key="all"
          type="button"
          role="tab"
          aria-selected={value === ''}
          className={value === '' ? 'active' : ''}
          onClick={() => onChange('')}
        >
          📚 TODOS
        </button>
      )}
      {books.map((book) => (
        <button
          key={book.id}
          type="button"
          role="tab"
          aria-selected={value === book.id}
          className={value === book.id ? 'active' : ''}
          onClick={() => onChange(book.id)}
          title={book.description}
        >
          {book.icon} {book.short_name}
        </button>
      ))}
    </div>
  );
}

/** Selo compacto com ícone + nome do livro. */
export function BookBadge({ book, bookId }) {
  const id = book?.id || bookId;
  if (!id && !book) return null;
  const name = book?.short_name || book?.name || id;
  const icon = book?.icon ? `${book.icon} ` : '';
  return <span className="badge badge-gold">{icon}{name}</span>;
}

export default BookTabs;
