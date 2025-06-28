import React, { useState } from 'react';
import { 
  FileStack, 
  Plus, 
  Search, 
  Filter, 
  Upload,
  Download,
  Eye,
  Edit,
  Trash2,
  Folder,
  File,
  Image,
  FileText,
  Calendar,
  Tag,
  Star,
  Share2,
  Clock
} from 'lucide-react';

const Documents = () => {
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [selectedTag, setSelectedTag] = useState('');

  const mockFolders = [
    { id: 'all', name: 'All Documents', count: 24, icon: FileStack },
    { id: 'contracts', name: 'Contracts', count: 8, icon: FileText },
    { id: 'invoices', name: 'Invoices', count: 12, icon: FileText },
    { id: 'proposals', name: 'Proposals', count: 6, icon: FileText },
    { id: 'marketing', name: 'Marketing Materials', count: 15, icon: Image },
    { id: 'legal', name: 'Legal Documents', count: 4, icon: FileText },
    { id: 'hr', name: 'HR Documents', count: 9, icon: Folder }
  ];

  const mockTags = [
    { id: 'urgent', name: 'Urgent', color: 'bg-red-100 text-red-800', count: 3 },
    { id: 'confidential', name: 'Confidential', color: 'bg-purple-100 text-purple-800', count: 7 },
    { id: 'template', name: 'Template', color: 'bg-blue-100 text-blue-800', count: 5 },
    { id: 'archived', name: 'Archived', color: 'bg-gray-100 text-gray-800', count: 12 },
    { id: 'review', name: 'Needs Review', color: 'bg-yellow-100 text-yellow-800', count: 4 }
  ];

  const mockDocuments = [
    {
      id: '1',
      name: 'Software Development Contract - TechCorp',
      type: 'pdf',
      size: '2.4 MB',
      folder: 'contracts',
      tags: ['confidential', 'urgent'],
      lastModified: '2024-01-20',
      modifiedBy: 'John Doe',
      version: '1.2',
      starred: true,
      expiryDate: '2024-06-15'
    },
    {
      id: '2',
      name: 'Invoice Template 2024',
      type: 'docx',
      size: '156 KB',
      folder: 'invoices',
      tags: ['template'],
      lastModified: '2024-01-19',
      modifiedBy: 'Jane Smith',
      version: '2.0',
      starred: false,
      expiryDate: null
    },
    {
      id: '3',
      name: 'Company Logo Assets',
      type: 'zip',
      size: '15.8 MB',
      folder: 'marketing',
      tags: ['template'],
      lastModified: '2024-01-18',
      modifiedBy: 'Mike Johnson',
      version: '1.0',
      starred: true,
      expiryDate: null
    },
    {
      id: '4',
      name: 'Employee Handbook 2024',
      type: 'pdf',
      size: '3.2 MB',
      folder: 'hr',
      tags: ['review'],
      lastModified: '2024-01-17',
      modifiedBy: 'Alice Brown',
      version: '3.1',
      starred: false,
      expiryDate: '2024-12-31'
    },
    {
      id: '5',
      name: 'Project Proposal - StartupCo',
      type: 'pptx',
      size: '8.7 MB',
      folder: 'proposals',
      tags: ['confidential'],
      lastModified: '2024-01-16',
      modifiedBy: 'Bob Wilson',
      version: '1.0',
      starred: false,
      expiryDate: '2024-02-15'
    },
    {
      id: '6',
      name: 'Privacy Policy Document',
      type: 'docx',
      size: '245 KB',
      folder: 'legal',
      tags: ['review', 'urgent'],
      lastModified: '2024-01-15',
      modifiedBy: 'Carol Davis',
      version: '2.3',
      starred: true,
      expiryDate: '2024-07-01'
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="text-red-500" size={24} />;
      case 'docx': return <FileText className="text-blue-500" size={24} />;
      case 'pptx': return <FileText className="text-orange-500" size={24} />;
      case 'zip': return <File className="text-purple-500" size={24} />;
      case 'jpg':
      case 'png': return <Image className="text-green-500" size={24} />;
      default: return <File className="text-gray-500" size={24} />;
    }
  };

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFolder = selectedFolder === 'all' || doc.folder === selectedFolder;
    const matchesTag = !selectedTag || doc.tags.includes(selectedTag);
    return matchesSearch && matchesFolder && matchesTag;
  });

  const expiringDocuments = mockDocuments.filter(doc => {
    if (!doc.expiryDate) return false;
    const expiryDate = new Date(doc.expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Document Management
          </h1>
          <p className="text-gray-600 mt-1">Organize, store, and manage all your business documents</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center space-x-2 shadow-lg">
            <Upload size={20} />
            <span>Upload</span>
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Plus size={20} />
            <span>New Folder</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{mockDocuments.length}</div>
              <div className="text-emerald-100 text-sm">Total Documents</div>
            </div>
            <FileStack size={32} className="text-emerald-200" />
          </div>
          <div className="mt-4 text-emerald-100 text-sm">+5 added this week</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{mockFolders.length - 1}</div>
              <div className="text-blue-100 text-sm">Folders</div>
            </div>
            <Folder size={32} className="text-blue-200" />
          </div>
          <div className="mt-4 text-blue-100 text-sm">Organized categories</div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{expiringDocuments.length}</div>
              <div className="text-yellow-100 text-sm">Expiring Soon</div>
            </div>
            <Calendar size={32} className="text-yellow-200" />
          </div>
          <div className="mt-4 text-yellow-100 text-sm">Within 30 days</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">
                {mockDocuments.filter(d => d.starred).length}
              </div>
              <div className="text-purple-100 text-sm">Starred</div>
            </div>
            <Star size={32} className="text-purple-200" />
          </div>
          <div className="mt-4 text-purple-100 text-sm">Important documents</div>
        </div>
      </div>

      {/* Expiring Documents Alert */}
      {expiringDocuments.length > 0 && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="text-yellow-600" size={24} />
            <h3 className="text-lg font-semibold text-yellow-800">Documents Expiring Soon</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {expiringDocuments.map((doc) => (
              <div key={doc.id} className="bg-white border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  {getFileIcon(doc.type)}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{doc.name}</h4>
                    <p className="text-xs text-gray-500">
                      Expires: {doc.expiryDate ? new Date(doc.expiryDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Folders */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Folders</h3>
            <div className="space-y-2">
              {mockFolders.map((folder) => (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                    selectedFolder === folder.id
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <folder.icon size={18} />
                    <span className="text-sm font-medium">{folder.name}</span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {folder.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="space-y-2">
              {mockTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedTag(selectedTag === tag.id ? '' : tag.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-all ${
                    selectedTag === tag.id ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${tag.color}`}>
                    {tag.name}
                  </span>
                  <span className="text-xs text-gray-500">{tag.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Search and Controls */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-full"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                    <Filter size={16} />
                    <span>Filter</span>
                  </button>
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setActiveView('grid')}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        activeView === 'grid' 
                          ? 'bg-white text-gray-900 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Grid
                    </button>
                    <button
                      onClick={() => setActiveView('list')}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        activeView === 'list' 
                          ? 'bg-white text-gray-900 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      List
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="p-6">
              {activeView === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredDocuments.map((doc) => (
                    <div key={doc.id} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(doc.type)}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 truncate">{doc.name}</h4>
                            <p className="text-sm text-gray-500">{doc.size}</p>
                          </div>
                        </div>
                        {doc.starred && <Star className="text-yellow-500 fill-current" size={16} />}
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {doc.tags.map((tagId) => {
                            const tag = mockTags.find(t => t.id === tagId);
                            return tag ? (
                              <span key={tagId} className={`px-2 py-1 rounded-full text-xs font-medium ${tag.color}`}>
                                {tag.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                        
                        <div className="text-xs text-gray-500">
                          <div>Modified by {doc.modifiedBy}</div>
                          <div>{new Date(doc.lastModified).toLocaleDateString()}</div>
                          <div>Version {doc.version}</div>
                        </div>
                        
                        {doc.expiryDate && (
                          <div className="text-xs text-orange-600 font-medium">
                            Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Download size={16} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                          <Share2 size={16} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                          <Edit size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Size</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Modified</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Tags</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Expiry</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDocuments.map((doc) => (
                        <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              {getFileIcon(doc.type)}
                              <div>
                                <div className="font-medium text-gray-900 flex items-center space-x-2">
                                  <span>{doc.name}</span>
                                  {doc.starred && <Star className="text-yellow-500 fill-current" size={14} />}
                                </div>
                                <div className="text-sm text-gray-500">v{doc.version}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-600">{doc.size}</td>
                          <td className="py-4 px-4">
                            <div className="text-gray-900">{new Date(doc.lastModified).toLocaleDateString()}</div>
                            <div className="text-sm text-gray-500">{doc.modifiedBy}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex flex-wrap gap-1">
                              {doc.tags.slice(0, 2).map((tagId) => {
                                const tag = mockTags.find(t => t.id === tagId);
                                return tag ? (
                                  <span key={tagId} className={`px-2 py-1 rounded-full text-xs font-medium ${tag.color}`}>
                                    {tag.name}
                                  </span>
                                ) : null;
                              })}
                              {doc.tags.length > 2 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                                  +{doc.tags.length - 2}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            {doc.expiryDate ? (
                              <div className="text-sm text-orange-600">
                                {new Date(doc.expiryDate).toLocaleDateString()}
                              </div>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Eye size={16} />
                              </button>
                              <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                <Download size={16} />
                              </button>
                              <button className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                                <Edit size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {filteredDocuments.length === 0 && (
                <div className="text-center py-12">
                  <FileStack size={64} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;