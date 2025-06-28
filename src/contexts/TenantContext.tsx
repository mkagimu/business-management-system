import React, { createContext, useContext, useState, useEffect } from 'react';

interface Tenant {
  id: string;
  name: string;
  domain: string;
  logo?: string;
  primaryColor: string;
  settings: {
    features: string[];
    limits: {
      users: number;
      projects: number;
      storage: number;
    };
  };
}

interface TenantContextType {
  currentTenant: Tenant | null;
  setCurrentTenant: (tenant: Tenant) => void;
  tenants: Tenant[];
  switchTenant: (tenantId: string) => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};

const mockTenants: Tenant[] = [
  {
    id: '1',
    name: 'BusinessHub Pro',
    domain: 'businesshub.com',
    primaryColor: '#3B82F6',
    settings: {
      features: ['all'],
      limits: {
        users: 100,
        projects: 500,
        storage: 1000
      }
    }
  },
  {
    id: '2',
    name: 'StartupCorp',
    domain: 'startup.businesshub.com',
    primaryColor: '#10B981',
    settings: {
      features: ['leads', 'projects', 'tasks', 'clients'],
      limits: {
        users: 10,
        projects: 50,
        storage: 100
      }
    }
  },
  {
    id: '3',
    name: 'Enterprise Solutions',
    domain: 'enterprise.businesshub.com',
    primaryColor: '#8B5CF6',
    settings: {
      features: ['all'],
      limits: {
        users: 1000,
        projects: 5000,
        storage: 10000
      }
    }
  }
];

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(() => {
    const saved = localStorage.getItem('currentTenant');
    return saved ? JSON.parse(saved) : mockTenants[0];
  });
  
  const [tenants] = useState<Tenant[]>(mockTenants);

  useEffect(() => {
    if (currentTenant) {
      localStorage.setItem('currentTenant', JSON.stringify(currentTenant));
      
      // Apply tenant-specific styling
      document.documentElement.style.setProperty('--primary-color', currentTenant.primaryColor);
    }
  }, [currentTenant]);

  const switchTenant = (tenantId: string) => {
    const tenant = tenants.find(t => t.id === tenantId);
    if (tenant) {
      setCurrentTenant(tenant);
    }
  };

  return (
    <TenantContext.Provider value={{ currentTenant, setCurrentTenant, tenants, switchTenant }}>
      {children}
    </TenantContext.Provider>
  );
};