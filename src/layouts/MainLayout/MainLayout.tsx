import type { ChildrenProps } from '@/types';

import { Content, Wrapper } from './styles';

export function MainLayout({ children }: ChildrenProps) {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
}
