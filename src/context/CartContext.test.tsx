import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, render, screen } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';

const product = { id: 1, title: 'Reusable Bottle', price: 20, image: '', shortDesc: 'Bottle' };

function CartHarness() {
  const cart = useCart();
  return (
    <div>
      <span data-testid="count">{cart.getCartCount()}</span>
      <span data-testid="total">{cart.getCartTotal()}</span>
      <span data-testid="error">{cart.error}</span>
      <button onClick={() => void cart.addToCart(product)}>Add</button>
      <button onClick={() => cart.updateQuantity(1, 3)}>Quantity</button>
      <button onClick={() => cart.removeFromCart(1)}>Remove</button>
      <button onClick={() => cart.clearCart()}>Clear</button>
    </div>
  );
}

describe('CartProvider', () => {
  beforeEach(() => { localStorage.clear(); vi.useFakeTimers(); });
  afterEach(() => { cleanup(); vi.useRealTimers(); });
  it('adds a product, updates quantity and removes it', async () => {
    const { container } = render(<CartProvider><CartHarness /></CartProvider>);
    const click = async (label: string) => {
      await act(async () => {
        (Array.from(container.querySelectorAll('button')).find(b => b.textContent === label) as HTMLButtonElement).click();
        await vi.runAllTimersAsync();
      });
    };
    await click('Add');
    expect(screen.getByTestId('count').textContent).toBe('1');
    expect(screen.getByTestId('total').textContent).toBe('20');
    await click('Quantity');
    expect(screen.getByTestId('count').textContent).toBe('3');
    expect(screen.getByTestId('total').textContent).toBe('60');
    await click('Remove');
    expect(screen.getByTestId('count').textContent).toBe('0');
  });
  it('starts with an empty cart', () => {
    render(<CartProvider><CartHarness /></CartProvider>);
    expect(screen.getByTestId('count').textContent).toBe('0');
  });
});
